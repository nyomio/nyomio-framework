package nyomio.admin.user

import nyomio.commons.revisionedentity.*
import org.jetbrains.exposed.sql.*

class User(
        var email: String,
        var name: String,
        var organizationId: Long,
        entityId: Long? = null
) : Entity(entityId) {
    constructor(row: ResultRow) :
            this(
                    row[UserTable.email],
                    row[UserTable.name],
                    row[UserTable.organizationId],
                    row[UserTable.entityId]
            )

    constructor() : this("", "", 0L, 0L)
}
