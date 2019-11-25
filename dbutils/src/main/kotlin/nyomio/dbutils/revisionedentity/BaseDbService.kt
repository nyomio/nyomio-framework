package nyomio.dbutils.revisionedentity

import io.reactivex.Single
import nyomio.dbutils.DbAccess
import nyomio.dbutils.OperationContext
import nyomio.dbutils.revisionedentity.QueryBuilder.Companion.atTimestamp
import org.jetbrains.exposed.sql.*
import org.jetbrains.exposed.sql.statements.InsertStatement
import org.jetbrains.exposed.sql.transactions.transaction

abstract class BaseDbService<E : Entity, T : EntityTable>
constructor(private val dba: DbAccess) {

    protected abstract fun table(): T

    protected abstract fun mapResultRowToEntity(resultRow: ResultRow): E

    protected abstract fun mapEntityToInsertStatement(stmt: InsertStatement<Number>, entity: E)

    open fun listAll(timeStamp: Long = System.currentTimeMillis(), filter: String? = null) =
            executeSelectQuery(atTimestamp(timeStamp).filter(filter))

    fun getById(id: Long, timestamp: Long = System.currentTimeMillis()) =
            executeSelectQuery(atTimestamp(timestamp).andWhere { table().entityId eq id })

    fun add(entity: E): Long {
        return transaction(dba.db) {
            insertRevisioned(table()) {
                mapEntityToInsertStatement(it, entity)
            }
        }
    }

    fun edit(entity: E) {
        transaction(dba.db) {
            updateRevisioned(table(), entityId = entity.id!!) {
                mapEntityToInsertStatement(it, entity)
            }
        }
    }

    fun delete(entityId: Long) {
        transaction(dba.db) {
            deleteRevisioned(table(), entityId)
        }
    }

    protected fun Query.filter(filter: String?): Query {
        return QueryBuilder.filter(table(), this, filter)
    }

    fun atTimestamp(timestamp: Long): Query {
        return table().selectAll().atTimestamp(timestamp)
    }

    protected fun executeSelectQuery(query: Query) = Single.fromCallable {
        transaction(dba.db) {
            query.toList()
        }.map {
            mapResultRowToEntity(it)
        }
    }

    fun insertRevisioned(entityTable: EntityTable, timeStamp: Long = System.currentTimeMillis(),
                         operationContext: OperationContext? = null,
                         updateBody: (InsertStatement<Number>) -> Unit): Long {
        return insertRevisionedInternal(entityTable, null, timeStamp, updateBody, operationContext)
    }

    protected fun insertRevisionedInternal(entityTable: EntityTable, entityId: Long?, timeStamp: Long,
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
