package admin.device

import io.micronaut.http.annotation.Controller
import io.micronaut.http.annotation.Get
import io.micronaut.http.annotation.PathVariable
import io.micronaut.security.annotation.Secured
import io.micronaut.security.rules.SecurityRule
import nyomio.dbutils.revisionedentity.BaseController

@Controller("/api/v1/admin/{organizationName}/device")
@Secured(SecurityRule.IS_AUTHENTICATED)
class DeviceController
constructor(private val deviceDbService: DeviceDbServiceRevisionedQueryDbService)
    : BaseController<Device, DeviceTable>(deviceDbService) {


    @Get(uri = "/own-at/{timestamp}{/filter}")
    fun listOwnAt(@PathVariable("organizationName") organizationName: String,
                  @PathVariable("timestamp") timestamp: Long,
                  @PathVariable("filter") filter: String?) =
            deviceDbService.listAllForUser(organizationName, timestamp, filter)
}
