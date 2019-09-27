package admin.db

import admin.organization.OrganizationTable
import io.micronaut.context.annotation.Property
import org.jetbrains.exposed.sql.Database
import org.jetbrains.exposed.sql.SchemaUtils
import org.jetbrains.exposed.sql.transactions.transaction
import org.slf4j.LoggerFactory
import javax.inject.Singleton

@Singleton
class DbAccess
constructor(
        @Property(name = "db.connection-string")
        private val dbConnectionString: String,
        @Property(name = "db.driver")
        private val dbDriver: String,
        @Property(name = "db.user")
        private val dbUser: String,
        @Property(name = "db.password")
        private val dbPass: String,
        @Property(name = "db.create-tables", value = "false")
        private val dbCreateTables: Boolean
) {
    private val logger = LoggerFactory.getLogger(DbAccess::class.java)
    val db by lazy {
        Database.connect(dbConnectionString, dbDriver, dbUser, dbPass).also {
            if (dbCreateTables) {
                if (logger.isDebugEnabled) {
                    logger.debug("Updating schema because db.create-tables property is set to true")
                }
                transaction(it) {
                    SchemaUtils.createMissingTablesAndColumns(OrganizationTable)
                }
            }
        }
    }
}

