package admin.employee

import io.micronaut.http.annotation.Controller
import io.micronaut.http.annotation.Get
import io.micronaut.http.annotation.PathVariable
import io.micronaut.security.annotation.Secured
import io.micronaut.security.authentication.Authentication
import io.micronaut.security.rules.SecurityRule
import nyomio.dbutils.revisionedentity.BaseController
import org.slf4j.LoggerFactory

@Controller("/api/v1/admin/{organizationName}/employee")
@Secured(SecurityRule.IS_AUTHENTICATED)
class EmployeeController
constructor(private val employeeDbService: EmployeeDbServiceRevisionedQueryDbService)
    : BaseController<Employee, EmployeeTable>(employeeDbService) {

    private val logger = LoggerFactory.getLogger(EmployeeController::class.java)

    @Get(uri = "/matching-for-user")
    fun getMatchingForUser(@PathVariable("organizationName") organizationName: String, authentication: Authentication) =
        employeeDbService.getMatchingForUser(organizationName)

    @Get(uri = "/own-at/{timestamp}{/filter}")
    fun listOwnAt(@PathVariable("organizationName") organizationName: String,
                  @PathVariable("timestamp") timestamp: Long,
                  @PathVariable("filter") filter: String?) =
            employeeDbService.listOwnAt(organizationName, timestamp, filter)
}
