package admin.device

import io.micronaut.http.annotation.Controller
import io.micronaut.http.annotation.Get
import io.micronaut.http.annotation.PathVariable
import io.micronaut.http.annotation.Put
import io.micronaut.security.annotation.Secured
import io.micronaut.security.rules.SecurityRule
import io.reactivex.Single
import nyomio.dbutils.revisionedentity.BaseController

@Controller("/api/v1/admin/{organizationName}/device")
@Secured(SecurityRule.IS_AUTHENTICATED)
class DeviceController
constructor(private val deviceDbService: DeviceRevisionedDbService)
    : BaseController<Device, DeviceTable>(deviceDbService) {

    @Get(uri = "/own-at/{timestamp}{/filter}")
    fun listOwnAt(organizationName: String,
                  timestamp: Long,
                  filter: String?) =
            deviceDbService.listAllForUser(organizationName, timestamp, filter)

    @Secured("admin")
    @Get(uri = "/all-at/{timestamp}{/filter}")
    override fun listAt(timestamp: Long, filter: String?): Single<List<Device>> {
        return super.listAt(timestamp, filter)
    }

    @Put(uri = "/own")
    fun addOwn(organization: String, device: Device) =
            if (device.id == 0L)
                deviceDbService.addOwn(organization, device)
            else {
                deviceDbService.edit(device)
                device.id
            }
}
