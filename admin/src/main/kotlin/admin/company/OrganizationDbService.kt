package admin.company

import admin.db.DbAccess
import io.reactivex.Single
import javax.inject.Singleton

data class Organization(val id: Long, val name: String, val address: String)

@Singleton
class OrganizationDbService
constructor(private val db: DbAccess) {

    fun listAll() = Single.just(listOf(
            Organization(1, "Inepex zrt.", "1054, Honvéd u. 8."),
            Organization(1, "Székhelyszolgálat.net kft.", "1054, Honvéd u. 8."),
            Organization(1, "Inclust kft.", "1054, Honvéd u. 8."),
            Organization(1, "Somodi Tibor ev", "1054, Honvéd u. 8.")
            ))


}
