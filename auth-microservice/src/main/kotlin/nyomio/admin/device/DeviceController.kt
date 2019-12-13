package nyomio.admin.device

import io.micronaut.http.annotation.Controller
import io.micronaut.http.annotation.Get
import io.micronaut.http.annotation.Put
import io.micronaut.security.annotation.Secured
import io.micronaut.security.rules.SecurityRule
import nyomio.commons.revisionedentity.BaseController

@Controller("/api/v1/admin/{organizationName}/device")
@Secured(SecurityRule.IS_AUTHENTICATED)
class DeviceController
constructor(private val deviceDbService: DeviceRevisionedDbService)
    : BaseController<Device, DeviceTable>(deviceDbService) {

    @Get(uri = "/own-at{/timestamp}{/filter}")
    fun listOwnAt(organizationName: String,
                  timestamp: Long?,
                  filter: String?) =
            deviceDbService.listOwnAt(organizationName, timestamp
                    ?: System.currentTimeMillis(), filter)

    @Put(uri = "/own")
    fun addOwn(organization: String, device: Device) =
            if (device.id == 0L)
                deviceDbService.addOwn(organization, device)
            else {
                deviceDbService.edit(device)
                device.id
            }

    @Secured("admin")
    override fun listAt(timestamp: Long, filter: String?) = super.listAt(timestamp, filter)

    @Secured("admin")
    override fun list() = super.list()

    @Secured("admin")
    override fun getById(id: Long, timestamp: Long?) = super.getById(id, timestamp)
}
