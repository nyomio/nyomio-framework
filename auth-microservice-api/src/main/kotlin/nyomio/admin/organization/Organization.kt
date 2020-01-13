package nyomio.admin.organization

import nyomio.commons.revisionedentity.*
import org.jetbrains.exposed.sql.*

class Organization(val org_name: String, val org_shortName: String, val org_address: String, entityId: Long? = null,
                   val revisionId: Long? = null) : Entity(entityId) {
    constructor(row: ResultRow) :
            this(row[OrganizationTable.name],
                    row[OrganizationTable.shortName],
                    row[OrganizationTable.address],
                    row[OrganizationTable.entityId])
}
