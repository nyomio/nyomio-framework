package nyomio.admin.user

import nyomio.admin.organization.OrganizationDbService
import nyomio.admin.organization.OrganizationTable
import io.micronaut.security.utils.SecurityService
import io.reactivex.Single
import nyomio.commons.*
import nyomio.commons.revisionedentity.*
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
