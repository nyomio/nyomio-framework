package nyomio.dbutils.revisionedentity

import com.sun.xml.internal.fastinfoset.alphabet.BuiltInRestrictedAlphabets.table
import nyomio.dbutils.OperationContext
import org.jetbrains.exposed.sql.*
import org.jetbrains.exposed.sql.statements.InsertStatement
import org.slf4j.LoggerFactory
import javax.inject.Singleton

open class Entity(val id: Long? = null)

open class EntityTable : Table() {
    val revisionId: Column<Long> = (long("revision_id") references RevisionTable.id).primaryKey()
    val entityId: Column<Long> = long("entity_id").autoIncrement()
}

object RevisionTable : Table() {
    val id: Column<Long> = long("id").autoIncrement().primaryKey()
    val timestamp: Column<Long> = long("timestamp")
    val traceId: Column<String> = varchar("traceId", 30)
    val userId: Column<Long> = long("userId")
}

object RevisionEndTable : Table() {
    val revisionId: Column<Long> = (long("revisionId") references RevisionTable.id).primaryKey()
    val timestamp: Column<Long> = long("timestamp")
    val traceId: Column<String> = varchar("traceId", 30)
    val userId: Column<Long> = long("userId")
}


@Singleton
class RevisionedQueryService {

    fun filter(table: EntityTable, filter: String?): Query {
        return if (filter == null || filter == "") {
            table.selectAll()
        } else {
            table.select {
                table.columns.fold(Op.FALSE as Op<Boolean>) { op, col ->
                    var newOp: Op<Boolean> = op
                    when (col.columnType) {
                        is StringColumnType -> {
                            col as Column<String>
                            newOp = op or (col like "%$filter%")
                        }
                        is IntegerColumnType -> {
                            try {
                                col as Column<Int>
                                newOp = op or (col eq filter.toInt())
                            } catch (e: NumberFormatException) {
                            }
                        }
                        is DoubleColumnType -> {
                            try {
                                col as Column<Double>
                                newOp = op or (col eq filter.toDouble())
                            } catch (e: NumberFormatException) {
                            }
                        }
                        is FloatColumnType -> {
                            try {
                                col as Column<Float>
                                newOp = op or (col eq filter.toFloat())
                            } catch (e: NumberFormatException) {
                            }
                        }
                        is LongColumnType -> {
                            try {
                                col as Column<Long>
                                newOp = op or (col eq filter.toLong())
                            } catch (e: NumberFormatException) {
                            }
                        }
                    }
                    newOp
                }
            }
        }
    }

    /**
     * Adds joins and where clauses all the target tables, so that only the rows live at the
     * given timestamp will be returned.
     */
    fun atTimestamp(timestamp: Long, query: Query): Query {
        var i = 1
        query.targets.forEach {
            val entityTbl = it as EntityTable
            val revAlias = RevisionTable.alias("rev$i")
            val revEndAlias = RevisionEndTable.alias("revEnd$i")

            query.adjustColumnSet { join(revAlias, JoinType.INNER, entityTbl.revisionId, revAlias[RevisionTable.id]) }
            query.adjustColumnSet { join(revEndAlias, JoinType.LEFT, entityTbl.revisionId, revEndAlias[RevisionEndTable.revisionId]) }
            query.andWhere {
                revAlias[RevisionTable.timestamp] lessEq timestamp and
                        ((revEndAlias[RevisionEndTable.timestamp] greater timestamp)
                                or revEndAlias[RevisionEndTable.timestamp].isNull())
            }
            i++
        }
        return query
    }
    fun insertRevisioned(entityTable: EntityTable, timeStamp: Long = System.currentTimeMillis(),
                         operationContext: OperationContext? = null,
                         updateBody: (InsertStatement<Number>) -> Unit): Long {
        return insertRevisionedInternal(entityTable, null, timeStamp, updateBody, operationContext)
    }

    fun updateRevisioned(entityTable: EntityTable, entityId: Long, timeStamp: Long = System.currentTimeMillis(),
                         operationContext: OperationContext? = null,
                         updateBody: (InsertStatement<Number>) -> Unit
    ) {
        // TODO: date checks
        // Do not allow update if at the given timestamp the entity is already closed (means: revision end set)
        closeOpenRevision(entityTable, entityId, timeStamp, operationContext)
        insertRevisionedInternal(entityTable, entityId, timeStamp, updateBody, operationContext)
    }

    fun deleteRevisioned(entityTable: EntityTable, entityId: Long, timeStamp: Long = System.currentTimeMillis(),
                         operationContext: OperationContext? = null) {
        // TODO: date checks
        closeOpenRevision(entityTable, entityId, timeStamp, operationContext)
    }


    private fun insertRevisionedInternal(entityTable: EntityTable, entityId: Long?, timeStamp: Long,
                                         updateBody: (InsertStatement<Number>) -> Unit,
                                         operationContext: OperationContext? = null): Long {
        // TODO: date checks
        val nextRevisionId = insertNewRevision(timeStamp, operationContext)

        return entityTable.insert {
            InsertStatement<Number>(this).apply {
                updateBody(it)
            }
            it[revisionId] = nextRevisionId
            entityId?.let { notNull ->
                it[this.entityId] = notNull
            }
        }.resultedValues?.get(0)?.get(entityTable.entityId)!!
    }

    private fun closeOpenRevision(entityTable: EntityTable, entityId: Long, timeStamp: Long,
                                  operationContext: OperationContext? = null) {
        val previousRevisionId = atTimestamp(timeStamp, (entityTable.select {
            entityTable.entityId eq entityId
        })).toList().last()[entityTable.revisionId]

        RevisionEndTable.insert {
            it[revisionId] = previousRevisionId
            it[timestamp] = timeStamp
            it[traceId] = operationContext?.traceId ?: ""
            it[userId] = operationContext?.userId ?: -1
        }
    }

    private fun insertNewRevision(timeStamp: Long, operationContext: OperationContext? = null) =
            RevisionTable.insert {
                it[timestamp] = timeStamp
                it[traceId] = operationContext?.traceId ?: ""
                it[userId] = operationContext?.userId ?: -1
            }.resultedValues?.get(0)?.get(RevisionTable.id)!!

}
