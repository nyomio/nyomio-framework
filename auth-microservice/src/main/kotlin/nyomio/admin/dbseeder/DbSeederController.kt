package nyomio.admin.dbseeder

import nyomio.admin.device.Device
import nyomio.admin.device.DeviceRevisionedDbService
import nyomio.admin.organization.Organization
import nyomio.admin.organization.OrganizationDbService
import nyomio.admin.user.User
import nyomio.admin.user.UserRevisionedDbService
import io.micronaut.http.annotation.Controller
import io.micronaut.http.annotation.Get
import io.micronaut.security.annotation.Secured

@Controller("/api/v1/admin/dbseeder")
@Secured("admin")
class DbSeederController
constructor(private val organizationDbService: OrganizationDbService,
            private val userDbService: UserRevisionedDbService,
            private val deviceDbService: DeviceRevisionedDbService) {

    @Get(uri = "/seed")
    fun seed() {
        organizationDbService.add(Organization("Carborail", "carborail", "Budapest")).let { organizationId ->
            userDbService.add(User("carbouser1@test.com", "carbouser1", organizationId))
            userDbService.add(User("carbouser2@test.com", "carbouser2", organizationId))
            deviceDbService.add(Device("device1", "imei1", organizationId))
            deviceDbService.add(Device("device2", "imei2", organizationId))

        }

        organizationDbService.add(Organization("Inepex", "inepex", "Budapest")).let { organizationId ->
            userDbService.add(User("ineuser1@test.com", "ineuser1", organizationId))
            userDbService.add(User("ineuser2@test.com", "ineuser2", organizationId))
            deviceDbService.add(Device("device3", "imei3", organizationId))
            deviceDbService.add(Device("device4", "imei4", organizationId))

        }

    }

}