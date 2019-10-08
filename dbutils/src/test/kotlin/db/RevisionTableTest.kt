package db

import org.jetbrains.exposed.sql.Column
import org.jetbrains.exposed.sql.SchemaUtils
import org.jetbrains.exposed.sql.selectAll
import org.jetbrains.exposed.sql.transactions.transaction
import org.junit.jupiter.api.Assertions
import org.junit.jupiter.api.BeforeAll
import org.junit.jupiter.api.Test


object TestDevice : EntityTable() {
    val secret: Column<String> = varchar("secret", 50)
    val name: Column<String> = varchar("name", 50)
    val owner: Column<Long> = long("owner_id")
}

object TestUser : EntityTable() {
    val name: Column<String> = varchar("name", 50)
    val email: Column<String> = varchar("email", 80)
}

class RevisionTableTest {

    companion object {

        var dbAccess: DbAccess? = null

        @BeforeAll
        @JvmStatic
        fun beforeAll() {
            dbAccess = DbAccess(
                    "jdbc:postgresql://localhost:5432/test",
                    "org.postgresql.Driver",
                    "postgres",
                    "lUosBQd2Sq",
                    false)
            dropRecreate()
            createTestUsers()
        }

        private fun dropRecreate() {
            transaction(dbAccess?.db) {
                TestDevice.dropStatement().forEach { exec(it) }
                TestUser.dropStatement().forEach { exec(it) }
                RevisionEndTable.dropStatement().forEach { exec(it) }
                RevisionTable.dropStatement().forEach { exec(it) }
                SchemaUtils.create(RevisionTable, RevisionEndTable, TestUser, TestDevice)
            }
        }

        private fun createTestUsers() {
            transaction(dbAccess?.db) {
                TestUser.insertRevisioned {
                    it[name] = "User1"
                    it[email] = "user@user1.com"
                }
                TestUser.insertRevisioned {
                    it[name] = "User2"
                    it[email] = "user@user2.com"
                }
            }
        }
    }

    @Test
    fun insertDevicesRevisioned() {
        transaction(dbAccess?.db) {

            val context = OperationContext("123", 1)

            val entityId = TestDevice.insertRevisioned(10, context) {
                it[secret] = "keepSaFe"
                it[name] = "Device1"
                it[owner] = 1
            }

            val newContext = OperationContext("234", 2)

            TestDevice.updateRevisioned(entityId, 20, newContext) {
                it[this.secret] = "keepItSaFe"
                it[name] = "TestDevice1"
                it[owner] = 1
            }
        }

        transaction(dbAccess?.db) {
            Assertions.assertEquals(0,
                    atTimestamp(0, TestDevice.selectAll()).toList().size)

            val earlier = atTimestamp(15, TestDevice.selectAll()).toList()
            Assertions.assertEquals(1, earlier.size)
            Assertions.assertEquals("keepSaFe", earlier[0][TestDevice.secret])
            Assertions.assertEquals("Device1", earlier[0][TestDevice.name])

            val latest = atTimestamp(40, TestDevice.selectAll()).toList()
            Assertions.assertEquals(1, latest.size)
            Assertions.assertEquals("keepItSaFe", latest[0][TestDevice.secret])
            Assertions.assertEquals("TestDevice1", latest[0][TestDevice.name])

            val allVersions = TestDevice.selectAll().toList()
            Assertions.assertEquals(2, allVersions.size)
        }
    }

    //TODO
    fun concurrentUpdateTest() {

    }
}
