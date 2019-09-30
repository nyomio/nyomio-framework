package admin

import admin.organization.OrganizationTable
import db.DbAccess
import io.micronaut.runtime.Micronaut
import io.micronaut.runtime.event.annotation.EventListener
import io.micronaut.runtime.server.event.ServerStartupEvent
import io.swagger.v3.oas.annotations.*
import io.swagger.v3.oas.annotations.info.*
import javax.inject.Singleton

@OpenAPIDefinition(
    info = Info(
            title = "admin",
            version = "0.0"
    )
)
object Application {

    @JvmStatic
    fun main(args: Array<String>) {
        Micronaut.build()
                .packages("admin")
                .mainClass(Application.javaClass)
                .start()
    }
}

@Singleton
class DbConfiguration(private val dbAccess: DbAccess) {
    @EventListener
    fun onStartup(event: ServerStartupEvent) {
        dbAccess.setTableListProvider { arrayOf(OrganizationTable) }
    }
}
