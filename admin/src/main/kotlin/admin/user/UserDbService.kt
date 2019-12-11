package admin.user

import admin.organization.OrganizationDbService
import admin.organization.OrganizationTable
import io.micronaut.security.utils.SecurityService
import io.reactivex.Single
import nyomio.dbutils.*
import nyomio.dbutils.revisionedentity.*
import org.jetbrains.exposed.sql.*
import org.jetbrains.exposed.sql.statements.InsertStatement
import org.slf4j.LoggerFactory
import javax.inject.Singleton

class UserWithoutOrg(
        val email: String,
        val name: String,
        entityId: Long? = null
) : Entity(entityId) {
    constructor(row: ResultRow) :
            this(
                    row[UserTable.email],
                    row[UserTable.name],
                    row[UserTable.entityId]
            )
}

class User(
        var email: String,
        var name: String,
        var organizationId: Long,
        entityId: Long? = null
) : Entity(entityId) {
    constructor(row: ResultRow) :
            this(
                    row[UserTable.email],
                    row[UserTable.name],
                    row[UserTable.organizationId],
                    row[UserTable.entityId]
            )

    constructor() : this("", "", 0L, 0L)
}

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

@Singleton
class UserRevisionedDbService
constructor(private val dba: DbAccess,
            private val securityService: SecurityService,
            private val orgDbService: OrganizationDbService
) : BaseDbService<User, UserTable>(dba) {

    private val logger = LoggerFactory.getLogger(UserRevisionedDbService::class.java)

    override fun table() = UserTable

    override fun mapResultRowToEntity(resultRow: ResultRow) = User(resultRow)

    override fun mapEntityToInsertStatement(stmt: InsertStatement<Number>, entity: User) =
            UserTable.insertFrom(stmt, entity)

    fun listOwnAt(organizationName: String, timestamp: Long = System.currentTimeMillis(), filter: String? = null) =
            orgDbService.getByShortName(organizationName).flatMap { org ->
                executeSelectQueryWithCustomMapping(atTimestamp(timestamp).filter(filter).andWhere {
                    UserTable.organizationId eq org.id!!
                }) {
                    UserWithoutOrg(it)
                }
            }

    fun getMatchingForUser(organizationName: String): Single<User?> {
        val email = securityService.authentication.get().attributes["email"] as String
        return executeSelectQueryWith(
                UserTable.join(OrganizationTable, JoinType.INNER, UserTable.organizationId, OrganizationTable.entityId).selectAll()
                        .atTimestamp(System.currentTimeMillis())
                        .andWhere { UserTable.email.eq(email) and OrganizationTable.shortName.eq(organizationName) })
                .map { it.firstOrNull() }
    }


    fun addOwn(organization: String, userWithoutOrg: UserWithoutOrg): Long {
        return UserMapper.INSTANCE.userWithoutOrgToUser(userWithoutOrg).let { user ->
            orgDbService.getByShortName(organization).map { org ->
                user.organizationId = org.id!!
                add(user)
            }.blockingGet()

        }
    }
}
