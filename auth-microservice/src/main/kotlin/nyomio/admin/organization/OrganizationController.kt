package nyomio.admin.organization

import io.micronaut.http.annotation.Controller
import io.micronaut.http.annotation.Get
import io.micronaut.security.annotation.Secured
import io.micronaut.security.rules.SecurityRule
import nyomio.commons.revisionedentity.BaseController

@Controller("/api/v1/admin/organization")
@Secured(SecurityRule.IS_AUTHENTICATED)
class OrganizationController
constructor(private val organizationDbService: OrganizationDbService)
    : BaseController<Organization, OrganizationTable>(organizationDbService) {

    @Get(uri = "/add-test-data")
    @Secured("admin")
    fun addTestData() = organizationDbService.addTestData()

    @Secured("admin")
    override fun listAt(timestamp: Long, filter: String?) = super.listAt(timestamp, filter)

    @Secured("admin")
    override fun list() = super.list()

}
