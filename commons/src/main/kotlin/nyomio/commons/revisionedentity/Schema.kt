package nyomio.commons.revisionedentity

import org.jetbrains.exposed.sql.Column
import org.jetbrains.exposed.sql.Table

open class Entity(val id: Long? = null)

open class EntityTable(name: String = "") : Table(name) {
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

