package nyomio.commons

import nyomio.commons.revisionedentity.*
import org.jetbrains.exposed.sql.*
import org.jetbrains.exposed.sql.statements.InsertStatement
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
        lateinit var userDbService: BaseDbService<Entity, TestUser>
        lateinit var deviceDbService: BaseDbService<Entity, TestDevice>


        @BeforeAll
        @JvmStatic
        fun beforeAll() {
            dbAccess = DbAccess(
                    "jdbc:postgresql://traefik.nyomio.local:5432/test",
                    "org.postgresql.Driver",
                    "postgres",
                    "xZ5ie8evM4",
                    false)
            deviceDbService = object : BaseDbService<Entity, TestDevice>(dbAccess!!) {
                override fun table() = TestDevice

                override fun mapResultRowToEntity(resultRow: ResultRow) = Entity()

                override fun mapEntityToInsertStatement(stmt: InsertStatement<Number>, entity: Entity) {
                }
            }
            userDbService = object : BaseDbService<Entity, TestUser>(dbAccess!!) {
                override fun table() = TestUser

                override fun mapResultRowToEntity(resultRow: ResultRow) = Entity()

                override fun mapEntityToInsertStatement(stmt: InsertStatement<Number>, entity: Entity) {
                }
            }
            dropRecreate()
            createTestUsers()
            createTestDevices()
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
                userDbService.insertRevisioned(TestUser, 10) {
                    it[TestUser.name] = "User1"
                    it[TestUser.email] = "user@user1.com"
                }

                userDbService.insertRevisioned(TestUser, 10) {
                    it[TestUser.name] = "User2"
                    it[TestUser.email] = "user@user2.com"
                }
            }

            transaction(dbAccess?.db) {
                userDbService.updateRevisioned(TestUser, 1, 20) {
                    it[TestUser.name] = "User1"
                    it[TestUser.email] = "user@user1-mail.com"
                }

                userDbService.updateRevisioned(TestUser, 2, 20) {
                    it[TestUser.name] = "User2 Boss"
                    it[TestUser.email] = "user@user2-mail.com"
                }
            }
        }

        private fun createTestDevices() {
            for (i in 1..3) {
                transaction(dbAccess?.db) {
                    insertTestDevice(i, if (i == 1) 1 else 2)
                }
            }
        }

        private fun insertTestDevice(index: Int, owner: Long, nameBase: String = "device", secretBase: String = "secret") {
            val entityId = deviceDbService.insertRevisioned(
                    TestDevice,
                    10,
                    OperationContext("ctx-${index}", 1)) {
                it[TestDevice.secret] = "${secretBase}-${index}"
                it[TestDevice.name] = "${nameBase}-${index}"
                it[TestDevice.owner] = owner
            }

            deviceDbService.updateRevisioned(TestDevice, entityId, 20,
                    OperationContext("ctx-${index}-2", 2)) {
                it[TestDevice.secret] = "${secretBase}-${index}-mod"
                it[TestDevice.name] = "${nameBase}-${index}-mod"
                it[TestDevice.owner] = owner
            }
        }
    }


    @Test
    fun `Query Devices at Different Timestamps`() {

        transaction(dbAccess?.db) {
            Assertions.assertEquals(0,
                    deviceDbService.atTimestamp(0).toList().size)

            val earlier = deviceDbService.atTimestamp(15).toList()
            Assertions.assertEquals(3, earlier.size)
            Assertions.assertEquals("secret-1", earlier[0][TestDevice.secret])
            Assertions.assertEquals("device-1", earlier[0][TestDevice.name])

            val latest = deviceDbService.atTimestamp(40).toList()
            Assertions.assertEquals(3, latest.size)
            Assertions.assertEquals("secret-1-mod", latest[0][TestDevice.secret])
            Assertions.assertEquals("device-1-mod", latest[0][TestDevice.name])

            val allVersions = TestDevice.selectAll().toList()
            Assertions.assertEquals(6, allVersions.size)

            Assertions.assertEquals(2,
                    deviceDbService.atTimestamp(40).andWhere { TestDevice.owner eq 2 }.toList().size)

        }
    }

    @Test
    fun `User to Device Join at Given Timestamp`() {
        transaction(dbAccess?.db) {
            val expectedRenderedResult = """
                …tDevice.revision_id | TestDevice.entity_id | TestDevice.secret    | TestDevice.name      | TestDevice.owner_id  | TestUser.revision_id | TestUser.entity_id   | TestUser.name        | TestUser.email       | 
                5                    | 1                    | secret-1             | device-1             | 1                    | 1                    | 1                    | User1                | user@user1.com       | 
                7                    | 2                    | secret-2             | device-2             | 2                    | 2                    | 2                    | User2                | user@user2.com       | 
                9                    | 3                    | secret-3             | device-3             | 2                    | 2                    | 2                    | User2                | user@user2.com       | 
                """.trimIndent()

            val renderedResult = TestDevice
                    .join(TestUser, JoinType.INNER, TestDevice.owner, TestUser.entityId)
                    .selectAll().atTimestamp(15)
                    .renderResult("nyomio.dbutils.")
//            val renderedResult = deviceDbService.atTimestamp(15,
//                    TestDevice
//                            .join(TestUser, JoinType.INNER, TestDevice.owner, TestUser.entityId)
//                            .selectAll())
//                    .renderResult("nyomio.dbutils.")

            Assertions.assertEquals(expectedRenderedResult, renderedResult)
        }


        transaction(dbAccess?.db) {
            val expectedRenderedResult = """
                …tDevice.revision_id | TestDevice.entity_id | TestDevice.secret    | TestDevice.name      | TestDevice.owner_id  | TestUser.revision_id | TestUser.entity_id   | TestUser.name        | TestUser.email       | 
                8                    | 2                    | secret-2-mod         | device-2-mod         | 2                    | 4                    | 2                    | User2 Boss           | user@user2-mail.com  | 
                10                   | 3                    | secret-3-mod         | device-3-mod         | 2                    | 4                    | 2                    | User2 Boss           | user@user2-mail.com  | 
                """.trimIndent()
            val renderedResult = TestDevice
                    .join(TestUser, JoinType.INNER, TestDevice.owner, TestUser.entityId)
                    .selectAll().atTimestamp(20).andWhere {TestUser.name like "%Boss" }
                    .renderResult("nyomio.dbutils.")
        }
    }

    //TODO
    fun concurrentUpdateTest() {

    }
}
