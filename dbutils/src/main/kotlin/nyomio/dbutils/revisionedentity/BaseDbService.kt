package nyomio.dbutils.revisionedentity

import com.sun.xml.internal.fastinfoset.alphabet.BuiltInRestrictedAlphabets.table
import nyomio.dbutils.DbAccess
import io.reactivex.Single
import org.jetbrains.exposed.sql.*
import org.jetbrains.exposed.sql.statements.InsertStatement
import org.jetbrains.exposed.sql.transactions.transaction
import org.slf4j.LoggerFactory
import java.lang.NumberFormatException

abstract class RevisionedQueryDbServiceBaseService<E : Entity, T : EntityTable>
constructor(private val dba: DbAccess,
            private val revSvc: RevisionedQueryService) {

    fun listAll(timestamp: Long = System.currentTimeMillis(), filter: String? = null) = Single.just(
            transaction(dba.db) {
                revSvc.atTimestamp(timestamp, revSvc.filter(table(), filter)).toList()
            }.map {
                mapResultRowToEntity(it)
            }
    )

    fun add(entity: E): Long {
        return transaction(dba.db) {
            revSvc.insertRevisioned(table()) {
                mapEntityToInsertStatement(it, entity)
            }
        }
    }

    fun edit(entity: E) {
        transaction(dba.db) {
            revSvc.updateRevisioned(table(), entityId = entity.id!!) {
                mapEntityToInsertStatement(it, entity)
            }
        }
    }

    fun getById(id: Long): Entity? {
        return transaction(dba.db) {
            table().select { table().entityId eq id }.firstOrNull()
        }?.let {
            mapResultRowToEntity(it)
        }
    }

    fun delete(entityId: Long) {
        transaction(dba.db) {
            revSvc.deleteRevisioned(table(), entityId)
        }
    }

    protected abstract fun table(): T

    protected abstract fun mapResultRowToEntity(resultRow: ResultRow): E

    protected abstract fun mapEntityToInsertStatement(stmt: InsertStatement<Number>, entity: E)

}
