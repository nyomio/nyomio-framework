package admin.<%= entityNameL1 %>

import nyomio.dbutils.*
import nyomio.dbutils.revisionedentity.*
import org.jetbrains.exposed.sql.*
import org.jetbrains.exposed.sql.statements.InsertStatement
import javax.inject.Singleton

class <%= entityNameU1 %>(
        val name: String,
        entityId: Long? = null
) : Entity(entityId) {
    constructor(row: ResultRow) :
            this(
                    row[<%= entityNameU1 %>Table.name],
                    row[<%= entityNameU1 %>Table.entityId]
            )
}

object <%= entityNameU1 %>Table : EntityTable() {
    val name: Column<String> = varchar("name", 100)

    fun insertFrom(stmt: InsertStatement<Number>, <%= entityNameL1 %>: <%= entityNameU1 %>) {
    }
}

@Singleton
class <%= entityNameU1 %>RevisionedDbService
constructor(private val dba: DbAccess)
    : BaseDbService<<%= entityNameU1 %>, <%= entityNameU1 %>Table>(dba) {

    override fun table() = <%= entityNameU1 %>Table

    override fun mapResultRowToEntity(resultRow: ResultRow) = <%= entityNameU1 %>(resultRow)

    override fun mapEntityToInsertStatement(stmt: InsertStatement<Number>, entity: <%= entityNameU1 %>) =
            <%= entityNameU1 %>Table.insertFrom(stmt, entity)

}
