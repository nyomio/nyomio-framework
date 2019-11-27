package admin.organization

import admin.organization.OrganizationTable.insertFrom
import nyomio.dbutils.*
import nyomio.dbutils.revisionedentity.RevisionedQueryDbServiceBaseService
import nyomio.dbutils.revisionedentity.Entity
import nyomio.dbutils.revisionedentity.EntityTable
import nyomio.dbutils.revisionedentity.RevisionedQueryService
import org.jetbrains.exposed.sql.*
import org.jetbrains.exposed.sql.statements.InsertStatement
import org.jetbrains.exposed.sql.transactions.transaction
import javax.inject.Singleton

class Organization(val org_name: String, val org_address: String, entityId: Long? = null,
                        val revisionId: Long? = null) : Entity(entityId) {
    constructor(row: ResultRow) :
            this(row[OrganizationTable.name],
                    row[OrganizationTable.address],
                    row[OrganizationTable.entityId])
}

object OrganizationTable : EntityTable() {
    val name: Column<String> = varchar("name", 100)
    val address: Column<String> = varchar("address", 200)

    fun insertFrom(stmt: InsertStatement<Number>, organization: Organization) {
        stmt[name] = organization.org_name
        stmt[address] = organization.org_address
    }
}

@Singleton
class OrganizationDbServiceRevisionedQueryDbService
constructor(private val dba: DbAccess,
            private val revSvc: RevisionedQueryService)
    : RevisionedQueryDbServiceBaseService<Organization, OrganizationTable>(dba, revSvc) {

    override fun table() = OrganizationTable

    override fun mapResultRowToEntity(resultRow: ResultRow) = Organization(resultRow)

    override fun mapEntityToInsertStatement(stmt: InsertStatement<Number>, entity: Organization) =
            OrganizationTable.insertFrom(stmt, entity)

    fun addTestData() {
        transaction(dba.db) {
            listOf(
                    Organization("Inepex zrt.", "1054, Honvéd u. 8."),
                    Organization("Székhelyszolgálat.net kft.", "1054, Honvéd u. 8."),
                    Organization("Inclust kft.", "1054, Honvéd u. 8."),
                    Organization("Somodi Tibor ev", "1054, Honvéd u. 8.")
            ).forEach { org ->
                revSvc.insertRevisioned(table()) {
                    insertFrom(it, org)
                }
            }
        }
    }

}
