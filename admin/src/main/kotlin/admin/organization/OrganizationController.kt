package admin.organization

import io.micronaut.http.annotation.Controller
import io.micronaut.http.annotation.Get
import io.micronaut.http.annotation.Post

@Controller("/api/v1/admin/organization")
class OrganizationController
constructor(private val organizationDbService: OrganizationDbService) {

    @Get(uri = "/all")
    fun list() = organizationDbService.listAll()

    @Get(uri = "/{id}")
    fun getById(id: Long) = organizationDbService.getById(id)

    @Post(uri = "/")
    fun add(organization: Organization) = organizationDbService.add(organization)

    @Get(uri = "/add-test-data")
    fun addTestData() = organizationDbService.addTestData()

    @Get(uri = "/create-schema")
    fun createSchema() = organizationDbService.createTables()

}
