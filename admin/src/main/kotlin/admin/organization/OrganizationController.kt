package admin.organization

import io.micronaut.http.annotation.Controller
import io.micronaut.http.annotation.Delete
import io.micronaut.http.annotation.Get
import io.micronaut.http.annotation.Put

@Controller("/api/v1/admin/organization")
class OrganizationController
constructor(private val organizationDbService: OrganizationDbService) {

    @Get(uri = "/all")
    fun list() = organizationDbService.listAll()

    @Get(uri = "/{id}")
    fun getById(id: Long) = organizationDbService.getById(id)

    @Delete(uri = "/{id}")
    fun deleteById(id: Long) = organizationDbService.delete(id)

    @Put(uri = "/")
    fun add(organization: Organization) =
            if (organization.id == 0L)
                organizationDbService.add(organization)
            else {
                organizationDbService.edit(organization)
                organization.id;
            }

    @Get(uri = "/add-test-data")
    fun addTestData() = organizationDbService.addTestData()

    @Get(uri = "/create-schema")
    fun createSchema() = organizationDbService.createTables()

}
