package admin.employee

import admin.organization.OrganizationTable
import io.micronaut.security.utils.SecurityService
import io.reactivex.Single
import nyomio.dbutils.*
import nyomio.dbutils.revisionedentity.BaseDbService
import nyomio.dbutils.revisionedentity.Entity
import nyomio.dbutils.revisionedentity.EntityTable
import nyomio.dbutils.revisionedentity.atTimestamp
import org.jetbrains.exposed.sql.*
import org.jetbrains.exposed.sql.statements.InsertStatement
import javax.inject.Singleton

data class Employee(
        val email: String,
        val name: String,
        val organizationId: Long
) : Entity() {
    constructor(row: ResultRow) :
            this(
                    row[EmployeeTable.email],
                    row[EmployeeTable.name],
                    row[EmployeeTable.organizationId]
            )
}

object EmployeeTable : EntityTable() {
    val email: Column<String> = varchar("email", 100)
    val name: Column<String> = varchar("name", 100)
    val organizationId: Column<Long> = long("organization_id")

    fun insertFrom(stmt: InsertStatement<Number>, employee: Employee) {
        stmt[email] = employee.email
        stmt[name] = employee.name
        stmt[organizationId] = employee.organizationId
    }
}

@Singleton
class EmployeeDbServiceRevisionedQueryDbService
constructor(private val dba: DbAccess,
            private val securityService: SecurityService)
    : BaseDbService<Employee, EmployeeTable>(dba) {

    override fun table() = EmployeeTable

    override fun mapResultRowToEntity(resultRow: ResultRow) = Employee(resultRow)

    override fun mapEntityToInsertStatement(stmt: InsertStatement<Number>, entity: Employee) =
            EmployeeTable.insertFrom(stmt, entity)

    fun listOwnAt(organizationName: String, timestamp: Long = System.currentTimeMillis(), filter: String? = null) =
            getMatchingForUser(organizationName).flatMap { employee ->
                executeSelectQuery(atTimestamp(timestamp).andWhere {
                    EmployeeTable.organizationId eq employee.organizationId
                })
            }

    fun getMatchingForUser(organizationName: String): Single<Employee?> {
        val email = securityService.authentication.get().attributes["email"] as String
        return executeSelectQuery(
                EmployeeTable.join(OrganizationTable, JoinType.INNER, EmployeeTable.organizationId, OrganizationTable.entityId).selectAll()
                        .atTimestamp(System.currentTimeMillis())
                        .andWhere { EmployeeTable.email.eq(email) and OrganizationTable.shortName.eq(organizationName) }
        ).map { it.firstOrNull() }
    }

}
