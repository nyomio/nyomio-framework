package admin.organization

import io.micronaut.http.annotation.Controller
import io.micronaut.http.annotation.Get
import io.micronaut.security.annotation.Secured
import io.micronaut.security.rules.SecurityRule
import nyomio.dbutils.revisionedentity.BaseController

@Controller("/api/v1/admin/organization")
@Secured(SecurityRule.IS_AUTHENTICATED)
class OrganizationController
constructor(private val organizationDbService: OrganizationDbServiceRevisionedQueryDbService)
    : BaseController<Organization, OrganizationTable>(organizationDbService) {

    @Get(uri = "/add-test-data")
    @Secured("admin")
    fun addTestData() = organizationDbService.addTestData()


}
