package admin.user

import io.micronaut.http.annotation.Controller
import io.micronaut.http.annotation.Get
import io.micronaut.http.annotation.PathVariable
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
    fun getMatchingForUser(@PathVariable("organization") organization: String) =
            userDbService.getMatchingForUser(organization)

    @Get(uri = "/own-at/{timestamp}{/filter}")
    fun listOwnAt(@PathVariable("organization") organizationName: String,
                  @PathVariable("timestamp") timestamp: Long,
                  @PathVariable("filter") filter: String?) =
            userDbService.listOwnAt(organizationName, timestamp, filter)

    @Put(uri = "/own")
    fun addOwn(organization: String, user: UserWithoutOrg) =
            if (user.id == 0L)
                userDbService.addOwn(organization, user)
            else {
                userDbService.edit(UserMapper.INSTANCE.userWithoutOrgToUser(user))
                user.id
            }
}
