package nyomio.commons

import io.zonky.test.db.postgres.embedded.EmbeddedPostgres
import org.junit.jupiter.api.Assertions
import org.junit.jupiter.api.Test
import java.sql.ResultSet
import java.sql.Statement

class EmbeddedPostgresTest {

    @Test
    fun testEmbedded() {
        EmbeddedPostgres.start().use { pg ->
            pg.postgresDatabase.connection.use { c ->
                val s: Statement = c.createStatement()
                val rs: ResultSet = s.executeQuery("SELECT 1")
                Assertions.assertTrue(rs.next())
                Assertions.assertEquals(1, rs.getInt(1))
                Assertions.assertFalse(rs.next())
            }
        }
    }
}
