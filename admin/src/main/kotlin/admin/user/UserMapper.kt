package admin.user

import org.mapstruct.Mapper
import org.mapstruct.factory.Mappers

@Mapper
abstract class UserMapper {

    companion object {
        val INSTANCE = Mappers.getMapper(UserMapper::class.java)
    }

    abstract fun userWithoutOrgToUser(userWithoutOrg: UserWithoutOrg): User
}
