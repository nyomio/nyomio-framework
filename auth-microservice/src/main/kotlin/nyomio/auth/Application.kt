package nyomio.auth

import io.micronaut.runtime.Micronaut
import io.micronaut.runtime.event.annotation.EventListener
import io.micronaut.runtime.server.event.ServerStartupEvent
import io.swagger.v3.oas.annotations.OpenAPIDefinition
import io.swagger.v3.oas.annotations.info.Info
import nyomio.admin.device.DeviceTable
import nyomio.admin.organization.OrganizationTable
import nyomio.admin.user.UserTable
import nyomio.commons.DbAccess
import javax.inject.Singleton


@OpenAPIDefinition(
        info = Info(
                title = "nyomio-auth-microservice",
                version = "0.1"
        )
)
object Application {

    @JvmStatic
    fun main(args: Array<String>) {
        Micronaut.build()
                .packages("")
                .mainClass(Application.javaClass)
                .start()
    }
}

@Singleton
class DbConfiguration(private val dbAccess: DbAccess) {
    @EventListener
    fun onStartup(event: ServerStartupEvent) {
        dbAccess.setTableListProvider { arrayOf(OrganizationTable, DeviceTable, UserTable ) }
    }
}
