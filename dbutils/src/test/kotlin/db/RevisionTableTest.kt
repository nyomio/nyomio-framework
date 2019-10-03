package db

import org.jetbrains.exposed.sql.*
import org.jetbrains.exposed.sql.transactions.transaction
import org.junit.jupiter.api.BeforeAll
import org.junit.jupiter.api.Test


object TestDevice : Table() {
    val revisionId: Column<Long> = (long("revisionId") references RevisionTable.id).primaryKey()
    val entityId: Column<Long> = long("entityId").autoIncrement("test_device_seq")
    val secret: Column<String> = varchar("secret", 50)
    val name: Column<String> = varchar("name", 50)
}

object TestUser : Table() {
    val entityId: Column<Long> = long("entityId")
    val secret: Column<String> = varchar("secret", 50)
    val name: Column<String> = varchar("name", 50)
}

class RevisionTableTest {

    companion object {

        var dbAccess: DbAccess? = null

        @BeforeAll
        @JvmStatic
        fun beforeAll() {
            dbAccess = DbAccess(
                    "jdbc:postgresql://localhost:5432/postgres",
                    "org.postgresql.Driver",
                    "postgres",
                    "lUosBQd2Sq",
                    false)
            transaction(dbAccess?.db) {
                SchemaUtils.createMissingTablesAndColumns(RevisionTable, RevisionEndTable, TestDevice)
            }
        }
    }

    @Test
    fun insertDevicesRevisioned() {
        transaction(dbAccess?.db) {
            val firstRevisionId = RevisionTable.insert {
                it[timestamp] = 10
                it[traceId] = "123"
                it[userId] = 1
            }.resultedValues?.get(0)?.get(RevisionTable.id)!!

            val generatedEntityId = TestDevice.insert {
                it[secret] = "keepSaFe"
                it[name] = "Devcie1"
                it[revisionId] = firstRevisionId
            }.resultedValues?.get(0)?.get(TestDevice.entityId)!!

            RevisionEndTable.insert {
                it[revisionId] = firstRevisionId
                it[timestamp] = 20
                it[traceId] = "234"
                it[userId] = 1
            }

            val secondRevisionId = RevisionTable.insert {
                it[timestamp] = 20
                it[traceId] = "234"
                it[userId] = 1
            }.resultedValues?.get(0)?.get(RevisionTable.id)!!

            TestDevice.insert {
                it[secret] = "keepSaFe"
                it[name] = "Devcie1"
                it[revisionId] = secondRevisionId
                it[entityId] = generatedEntityId
            }
        }
    }
}
