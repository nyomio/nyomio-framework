package nyomio.admin.user

import nyomio.commons.*
import nyomio.commons.revisionedentity.*
import org.jetbrains.exposed.sql.*
import org.jetbrains.exposed.sql.statements.InsertStatement

object UserTable : EntityTable() {
    val email: Column<String> = varchar("email", 100)
    val name: Column<String> = varchar("name", 100)
    val organizationId: Column<Long> = long("organization_id")

    fun insertFrom(stmt: InsertStatement<Number>, user: User) {
        stmt[email] = user.email
        stmt[name] = user.name
        stmt[organizationId] = user.organizationId
    }
}
