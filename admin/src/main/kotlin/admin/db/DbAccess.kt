package admin.db

import io.micronaut.context.annotation.Property
import org.jetbrains.exposed.sql.Database
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
        private val dbPass: String){

    val db by lazy {
        Database.connect(dbConnectionString, dbDriver, dbUser, dbPass)
    }
}

