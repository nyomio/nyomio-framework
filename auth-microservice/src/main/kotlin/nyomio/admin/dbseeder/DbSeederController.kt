package nyomio.admin.dbseeder

import io.micronaut.http.annotation.Controller
import io.micronaut.http.annotation.Get
import io.micronaut.security.annotation.Secured
import nyomio.admin.organization.Organization
import nyomio.admin.organization.OrganizationDbService
import nyomio.admin.user.User
import nyomio.admin.user.UserRevisionedDbService

@Controller("/api/v1/admin/dbseeder")
@Secured("admin")
class DbSeederController
constructor(private val organizationDbService: OrganizationDbService,
            private val userDbService: UserRevisionedDbService) {

    @Get(uri = "/seed")
    fun seed() {
//        organizationDbService.add(Organization("Carborail", "carborail", "Budapest")).let { organizationId ->
//            userDbService.add(User("carbouser1@test.com", "carbouser1", organizationId))
//            userDbService.add(User("carbouser2@test.com", "carbouser2", organizationId))
//
//        }

        organizationDbService.add(Organization("Inepex", "inepex", "Budapest")).let { organizationId ->
            userDbService.add(User("admin@nyom-app.local", "admin", organizationId))
            userDbService.add(User("user@nyom-app.local	", "user", organizationId))
        }

    }

}
