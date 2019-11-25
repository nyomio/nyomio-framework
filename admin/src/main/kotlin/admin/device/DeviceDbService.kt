package admin.device

import admin.employee.EmployeeDbServiceRevisionedQueryDbService
import nyomio.dbutils.*
import nyomio.dbutils.revisionedentity.*
import org.jetbrains.exposed.sql.*
import org.jetbrains.exposed.sql.statements.InsertStatement
import javax.inject.Singleton

data class Device(val name: String, val imei: String, val organizationId: Long) : Entity() {
    constructor(row: ResultRow) :
            this(row[DeviceTable.name],
                    row[DeviceTable.imei],
                    row[DeviceTable.organizationId])
}

object DeviceTable : EntityTable() {
    val name: Column<String> = varchar("name", 100)
    val imei: Column<String> = varchar("imei", 100)
    val organizationId: Column<Long> = long("organizationId")

    fun insertFrom(stmt: InsertStatement<Number>, device: Device) {
        stmt[name] = device.name
        stmt[imei] = device.imei
        stmt[organizationId] = device.organizationId
    }
}

@Singleton
class DeviceDbServiceRevisionedQueryDbService
constructor(private val employeeService: EmployeeDbServiceRevisionedQueryDbService,
            private val dba: DbAccess
            )
    : BaseDbService<Device, DeviceTable>(dba) {

    fun listAllForUser(organizationName: String, timestamp: Long = System.currentTimeMillis(), filter: String? = null) =
            employeeService.getMatchingForUser(organizationName).flatMap { empl ->
                executeSelectQuery(atTimestamp(timestamp).filter(filter)
                        .andWhere { DeviceTable.organizationId.eq(empl.organizationId) })
            }

    override fun table() = DeviceTable

    override fun mapResultRowToEntity(resultRow: ResultRow) = Device(resultRow)

    override fun mapEntityToInsertStatement(stmt: InsertStatement<Number>, entity: Device) =
            DeviceTable.insertFrom(stmt, entity)

}
