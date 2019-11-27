package admin.<%= entityNameL1 %>

import nyomio.dbutils.*
import nyomio.dbutils.revisionedentity.RevisionedQueryDbServiceBaseService
import nyomio.dbutils.revisionedentity.Entity
import nyomio.dbutils.revisionedentity.EntityTable
import nyomio.dbutils.revisionedentity.RevisionedQueryService
import org.jetbrains.exposed.sql.*
import org.jetbrains.exposed.sql.statements.InsertStatement
import org.jetbrains.exposed.sql.transactions.transaction
import javax.inject.Singleton

data class <%= entityNameU1 %>(val name: String) : Entity() {
    constructor(row: ResultRow) :
    this(row[<%= entityNameU1 %>Table.name])
}

object <%= entityNameU1 %>Table : EntityTable() {
    val name: Column<String> = varchar("name", 100)

    fun insertFrom(stmt: InsertStatement<Number>, <%= entityNameL1 %>: <%= entityNameU1 %>) {
    }
}

@Singleton
class <%= entityNameU1 %>DbServiceRevisionedQueryDbService
constructor(private val dba: DbAccess,
            private val revSvc: RevisionedQueryService)
    : RevisionedQueryDbServiceBaseService<<%= entityNameU1 %>, <%= entityNameU1 %>Table>(dba, revSvc) {

    override fun table() = <%= entityNameU1 %>Table

    override fun mapResultRowToEntity(resultRow: ResultRow) = <%= entityNameU1 %>(resultRow)

    override fun mapEntityToInsertStatement(stmt: InsertStatement<Number>, entity: <%= entityNameU1 %>) =
            <%= entityNameU1 %>Table.insertFrom(stmt, entity)

}
