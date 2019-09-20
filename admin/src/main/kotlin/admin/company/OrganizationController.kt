package admin.company

import io.micronaut.http.annotation.Controller
import io.micronaut.http.annotation.Get

@Controller("/api/v1/admin/organization")
class OrganizationController
 constructor(private val organizationDbService: OrganizationDbService){

    @Get(uri = "/all")
    fun list() = organizationDbService.listAll()


}
