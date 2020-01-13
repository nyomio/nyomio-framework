package nyomio.admin.organization

import nyomio.admin.organization.OrganizationTable.insertFrom
import nyomio.admin.organization.OrganizationTable.shortName
import nyomio.commons.DbAccess
import nyomio.commons.revisionedentity.BaseDbService
import org.jetbrains.exposed.sql.ResultRow
import org.jetbrains.exposed.sql.andWhere
import org.jetbrains.exposed.sql.statements.InsertStatement
import org.jetbrains.exposed.sql.transactions.transaction
import javax.inject.Singleton


@Singleton
class OrganizationDbService
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
                    Organization("Inclust kft.", "inclust", "1054, Honvéd u. 8."),
                    Organization("Somodi Tibor ev", "somodit", "1054, Honvéd u. 8.")
            ).forEach { org ->
                insertRevisioned(table()) {
                    insertFrom(it, org)
                }
            }
        }
    }

    fun getByShortName(organizationName: String) =
            executeSelectQueryWith(atTimestamp(System.currentTimeMillis()).andWhere { shortName eq organizationName })
                    .map { it.first() }

}
