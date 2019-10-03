package db

import org.jetbrains.exposed.sql.Column
import org.jetbrains.exposed.sql.Table


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
