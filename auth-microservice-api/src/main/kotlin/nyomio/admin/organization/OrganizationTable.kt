package nyomio.admin.organization

import nyomio.commons.*
import nyomio.commons.revisionedentity.*
import org.jetbrains.exposed.sql.*
import org.jetbrains.exposed.sql.statements.InsertStatement

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
