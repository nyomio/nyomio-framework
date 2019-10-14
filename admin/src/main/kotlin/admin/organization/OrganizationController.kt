package admin.organization

import io.micronaut.http.annotation.Controller
import io.micronaut.http.annotation.Delete
import io.micronaut.http.annotation.Get
import io.micronaut.http.annotation.Put
import io.micronaut.security.annotation.Secured
import io.micronaut.security.rules.SecurityRule

@Controller("/api/v1/admin/organization")
@Secured(SecurityRule.IS_AUTHENTICATED)
class OrganizationController
constructor(private val organizationDbService: OrganizationDbService) {

    @Get(uri = "/all")
    fun list() = organizationDbService.listAll()

    @Get(uri = "/{id}")
    fun getById(id: Long) = organizationDbService.getById(id)

    @Delete(uri = "/{id}")
    @Secured("admin")
    fun deleteById(id: Long) = organizationDbService.delete(id)

    @Put(uri = "/")
    @Secured("admin")
    fun add(organization: Organization) =
            if (organization.id == 0L)
                organizationDbService.add(organization)
            else {
                organizationDbService.edit(organization)
                organization.id;
            }

    @Get(uri = "/add-test-data")
    @Secured("admin")
    fun addTestData() = organizationDbService.addTestData()

    @Get(uri = "/create-schema")
    @Secured("admin")
    fun createSchema() = organizationDbService.createTables()

}
