package admin.organization

import io.reactivex.Single
import nyomio.dbutils.*
import org.jetbrains.exposed.sql.*
import org.jetbrains.exposed.sql.statements.InsertStatement
import org.jetbrains.exposed.sql.transactions.transaction
import javax.inject.Singleton

data class Organization(val org_name: String, val org_address: String, val id: Long? = null, val revisionId: Long? = null) {
    constructor(row: ResultRow) :
            this(row[OrganizationTable.name],
                    row[OrganizationTable.address],
                    row[OrganizationTable.entityId])
}

object OrganizationTable : EntityTable() {
    val name: Column<String> = varchar("name", 100)
    val address: Column<String> = varchar("address", 200)

    fun insertFrom(stmt: InsertStatement<Number>, organization: Organization) {
        stmt[name] = organization.org_name
        stmt[address] = organization.org_address
    }
}

@Singleton
class OrganizationDbService
constructor(private val dba: DbAccess) {

    fun createTables() {
        transaction(dba.db) {
            SchemaUtils.create(OrganizationTable, RevisionTable, RevisionEndTable)
        }
    }

    fun addTestData() {
        transaction(dba.db) {
            listOf(
                    Organization("Inepex zrt.", "1054, Honvéd u. 8."),
                    Organization("Székhelyszolgálat.net kft.", "1054, Honvéd u. 8."),
                    Organization("Inclust kft.", "1054, Honvéd u. 8."),
                    Organization("Somodi Tibor ev", "1054, Honvéd u. 8.")
            ).forEach { org ->
                OrganizationTable.insertRevisioned {
                    insertFrom(it, org)
                }
            }
        }
    }

    fun listAll(timestamp: Long = System.currentTimeMillis()) = Single.just(
            transaction(dba.db) {
                atTimestamp(timestamp, OrganizationTable.selectAll()).toList()
            }.map {
                Organization(it)
            }
    )

    fun add(organization: Organization): Long {
        return transaction(dba.db) {
            OrganizationTable.insertRevisioned {
                insertFrom(it, organization)
            }
        }
    }

    fun edit(organization: Organization) {
        transaction(dba.db) {
            OrganizationTable.updateRevisioned(entityId = organization.id!!) {
                insertFrom(it, organization)
            }
        }
    }

    fun getById(id: Long): Organization? {
        return transaction(dba.db) {
            OrganizationTable.select { OrganizationTable.entityId eq id }.firstOrNull()
        }?.let {
            Organization(it)
        }
    }

    fun delete(entityId: Long) {
        transaction(dba.db) {
            OrganizationTable.deleteRevisioned(entityId)
        }
    }

}
