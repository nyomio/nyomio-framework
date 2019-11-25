package admin.dbseeder

import admin.device.Device
import admin.device.DeviceDbServiceRevisionedQueryDbService
import admin.employee.Employee
import admin.employee.EmployeeDbServiceRevisionedQueryDbService
import admin.organization.Organization
import admin.organization.OrganizationDbServiceRevisionedQueryDbService
import io.micronaut.http.annotation.Controller
import io.micronaut.http.annotation.Put
import io.micronaut.security.annotation.Secured

@Controller("/api/v1/admin/dbseeder")
@Secured("admin")
class DbSeederController
constructor(private val organizationDbService: OrganizationDbServiceRevisionedQueryDbService,
            private val employeeDbService: EmployeeDbServiceRevisionedQueryDbService,
            private val deviceDbService: DeviceDbServiceRevisionedQueryDbService) {

    @Put(uri = "/seed")
    fun seed() {
        organizationDbService.add(Organization("Carborail", "carborail", "Budapest")).let { organizationId ->
            employeeDbService.add(Employee("carbouser1@test.com", "carbouser1", organizationId))
            employeeDbService.add(Employee("carbouser2@test.com", "carbouser2", organizationId))
            deviceDbService.add(Device("device1", "imei1", organizationId))
            deviceDbService.add(Device("device2", "imei2", organizationId))

        }

        organizationDbService.add(Organization("Inepex", "inepex", "Budapest")).let { organizationId ->
            employeeDbService.add(Employee("ineuser1@test.com", "ineuser1", organizationId))
            employeeDbService.add(Employee("ineuser2@test.com", "ineuser2", organizationId))
            deviceDbService.add(Device("device3", "imei3", organizationId))
            deviceDbService.add(Device("device4", "imei4", organizationId))

        }

    }

}
