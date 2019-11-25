package admin.organization

import admin.organization.OrganizationTable.insertFrom
import nyomio.dbutils.*
import nyomio.dbutils.revisionedentity.BaseDbService
import nyomio.dbutils.revisionedentity.Entity
import nyomio.dbutils.revisionedentity.EntityTable
import org.jetbrains.exposed.sql.*
import org.jetbrains.exposed.sql.statements.InsertStatement
import org.jetbrains.exposed.sql.transactions.transaction
import javax.inject.Singleton

class Organization(val org_name: String, val org_shortName: String, val org_address: String, entityId: Long? = null,
                        val revisionId: Long? = null) : Entity(entityId) {
    constructor(row: ResultRow) :
            this(row[OrganizationTable.name],
                    row[OrganizationTable.shortName],
                    row[OrganizationTable.address],
                    row[OrganizationTable.entityId])
}

object OrganizationTable : EntityTable() {
    val name: Column<String> = varchar("name", 100)
    val shortName: Column<String> = varchar("shortName", 10)
    val address: Column<String> = varchar("address", 200)

    fun insertFrom(stmt: InsertStatement<Number>, organization: Organization) {
        stmt[name] = organization.org_name
        stmt[shortName] = organization.org_shortName
        stmt[address] = organization.org_address
    }
}

@Singleton
class OrganizationDbServiceRevisionedQueryDbService
constructor(private val dba: DbAccess)
    : BaseDbService<Organization, OrganizationTable>(dba) {

    override fun table() = OrganizationTable

    override fun mapResultRowToEntity(resultRow: ResultRow) = Organization(resultRow)

    override fun mapEntityToInsertStatement(stmt: InsertStatement<Number>, entity: Organization) =
            OrganizationTable.insertFrom(stmt, entity)

    fun addTestData() {
        transaction(dba.db) {
            listOf(
                    Organization("Inepex zrt.", "inepex", "1054, Honvéd u. 8."),
                    Organization("Székhelyszolgálat.net kft.", "szekhely", "1054, Honvéd u. 8."),
                    Organization("Inclust kft.","inclust", "1054, Honvéd u. 8."),
                    Organization("Somodi Tibor ev", "somodit", "1054, Honvéd u. 8.")
            ).forEach { org ->
                insertRevisioned(table()) {
                    insertFrom(it, org)
                }
            }
        }
    }

}
