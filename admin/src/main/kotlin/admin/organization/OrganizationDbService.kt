package admin.organization

import nyomio.dbutils.DbAccess
import io.reactivex.Single
import org.jetbrains.exposed.dao.LongIdTable
import org.jetbrains.exposed.sql.*
import org.jetbrains.exposed.sql.statements.InsertStatement
import org.jetbrains.exposed.sql.statements.UpdateStatement
import org.jetbrains.exposed.sql.transactions.transaction
import javax.inject.Singleton

data class Organization(val id: Long, val org_name: String, val org_address: String) {
    constructor(row: ResultRow) :
            this(row[OrganizationTable.id].value,
                    row[OrganizationTable.name],
                    row[OrganizationTable.address])
}

object OrganizationTable : LongIdTable() {
    val name: Column<String> = varchar("name", 100)
    val address: Column<String> = varchar("address", 200)

    fun insertFrom(stmt: InsertStatement<Number>, organization: Organization) {
        stmt[name] = organization.org_name
        stmt[address] = organization.org_address
    }

    fun updateFrom(stmt: UpdateStatement, organization: Organization) {
        stmt[name] = organization.org_name
        stmt[address] = organization.org_address
    }
}

@Singleton
class OrganizationDbService
constructor(private val dba: DbAccess) {

    fun createTables() {
        transaction(dba.db) {
            SchemaUtils.create(OrganizationTable)
        }
    }

    fun addTestData() {
        transaction(dba.db) {
            listOf(
                    Organization(1, "Inepex zrt.", "1054, Honvéd u. 8."),
                    Organization(1, "Székhelyszolgálat.net kft.", "1054, Honvéd u. 8."),
                    Organization(1, "Inclust kft.", "1054, Honvéd u. 8."),
                    Organization(1, "Somodi Tibor ev", "1054, Honvéd u. 8.")
            ).forEach { org ->
                OrganizationTable.insert {
                    insertFrom(it, org)
                }
            }
        }
    }

    fun listAll() = Single.just(
            transaction(dba.db) {
                OrganizationTable.selectAll().toList()
            }.map {
                Organization(it)
            }
    )

    fun add(organization: Organization): Long {
        return transaction(dba.db) {
            OrganizationTable.insert {
                insertFrom(it, organization)
            }[OrganizationTable.id].value
        }
    }

    fun edit(organization: Organization) {
        transaction(dba.db) {
            OrganizationTable.update({ OrganizationTable.id eq organization.id }) {
                updateFrom(it, organization)
            }
        }
    }

    fun getById(id: Long): Organization? {
        return transaction(dba.db) {
            OrganizationTable.select { OrganizationTable.id eq id }.firstOrNull()
        }?.let {
            Organization(it)
        }
    }

    fun delete(id: Long) {
        transaction(dba.db) {
            OrganizationTable.deleteWhere { OrganizationTable.id eq id }
        }
    }

}
