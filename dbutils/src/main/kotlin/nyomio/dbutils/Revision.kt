package nyomio.dbutils

import org.jetbrains.exposed.sql.*
import org.jetbrains.exposed.sql.statements.InsertStatement

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


fun <T : EntityTable> T.insertRevisioned(timeStamp: Long = System.currentTimeMillis(),
                                                        operationContext: OperationContext? = null,
                                                        updateBody: T.(InsertStatement<Number>) -> Unit): Long {
    return insertRevisionedInternal(null, timeStamp, updateBody, operationContext)
}

fun <T : EntityTable> T.updateRevisioned(entityId: Long, timeStamp: Long = System.currentTimeMillis(),
                                         operationContext: OperationContext? = null,
                                         updateBody: T.(InsertStatement<Number>) -> Unit
) {
    // TODO: date checks
    // Do not allow update if at the given timestamp the entity is already closed (means: revision end set)
    closeOpenRevision(entityId, timeStamp, operationContext)
    insertRevisionedInternal(entityId, timeStamp, updateBody, operationContext)
}

fun <T : EntityTable> T.deleteRevisioned(entityId: Long, timeStamp: Long = System.currentTimeMillis(),
                                                  operationContext: OperationContext? = null) {
    // TODO: date checks
    closeOpenRevision(entityId, timeStamp, operationContext)
}


private fun <T : EntityTable> T.insertRevisionedInternal(entityId: Long?, timeStamp: Long,
                                                                        updateBody: T.(InsertStatement<Number>) -> Unit,
                                                                        operationContext: OperationContext? = null): Long {
    // TODO: date checks
    val nextRevisionId = insertNewRevision(timeStamp, operationContext)

    return this.insert {
        InsertStatement<Number>(this).apply {
            updateBody(it)
        }
        it[revisionId] = nextRevisionId
        entityId?.let { notNull ->
            it[this.entityId] = notNull
        }
    }.resultedValues?.get(0)?.get(this.entityId)!!
}

private fun <T : EntityTable> T.closeOpenRevision(entityId: Long, timeStamp: Long,
                                                  operationContext: OperationContext? = null) {
    val entityTable = this

    val previousRevisionId = atTimestamp(timeStamp, (entityTable.select {
        entityTable.entityId eq entityId
    })).toList().last()[this.revisionId]

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

