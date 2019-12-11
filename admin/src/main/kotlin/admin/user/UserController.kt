package admin.user

import io.micronaut.http.annotation.Controller
import io.micronaut.http.annotation.Get
import io.micronaut.http.annotation.Put
import io.micronaut.security.annotation.Secured
import io.micronaut.security.rules.SecurityRule
import nyomio.dbutils.revisionedentity.BaseController
import org.slf4j.LoggerFactory

@Controller("/api/v1/admin/{organization}/user")
@Secured(SecurityRule.IS_AUTHENTICATED)
class UserController
constructor(private val userDbService: UserRevisionedDbService)
    : BaseController<User, UserTable>(userDbService) {

    private val logger = LoggerFactory.getLogger(UserController::class.java)

    @Get(uri = "/matching-for-user")
    fun getMatchingForUser(organization: String) =
            userDbService.getMatchingForUser(organization)

    @Get(uri = "/own-at{/timestamp}{/filter}")
    fun listOwnAt(organization: String,
                  timestamp: Long?,
                  filter: String?) =
            userDbService.listOwnAt(organization, timestamp ?: System.currentTimeMillis(), filter)


    @Put(uri = "/own")
    fun addOwn(organization: String, user: UserWithoutOrg) =
            if (user.id == 0L)
                userDbService.addOwn(organization, user)
            else {
                userDbService.edit(UserMapper.INSTANCE.userWithoutOrgToUser(user))
                user.id
            }

    @Secured("admin")
    override fun listAt(timestamp: Long, filter: String?) = super.listAt(timestamp, filter)

    @Secured("admin")
    override fun list() = super.list()

    @Secured("admin")
    override fun getById(id: Long, timestamp: Long?) = super.getById(id, timestamp)
}
