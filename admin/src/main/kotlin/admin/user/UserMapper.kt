package admin.user

import org.mapstruct.Mapper
import org.mapstruct.ReportingPolicy
import org.mapstruct.factory.Mappers

@Mapper(unmappedTargetPolicy = ReportingPolicy.IGNORE)
abstract class UserMapper {

    companion object {
        val INSTANCE = Mappers.getMapper(UserMapper::class.java)
    }

    abstract fun userWithoutOrgToUser(userWithoutOrg: UserWithoutOrg): User
}
