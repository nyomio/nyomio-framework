package auth

import io.micronaut.http.HttpStatus
import io.micronaut.http.annotation.Controller
import io.micronaut.http.annotation.Get
import io.micronaut.http.exceptions.HttpStatusException
import io.micronaut.security.annotation.Secured
import io.micronaut.security.authentication.Authentication
import io.micronaut.security.rules.SecurityRule

data class AuthData(val loginUrl: String, val logoutUrl: String, val ssoLogoutUrl: String, val user: UserData?)
data class UserData(val userName: String, val email: String, val roles: List<String>)

@Controller("/api/v1/auth/")
class UserEndpoint {

    @Get("/user")
    @Secured(SecurityRule.IS_ANONYMOUS)
    fun index(auth: Authentication?): AuthData {
        val userData = auth?.let {
            val authRoles = auth.attributes["roles"]?.let { roles ->
                if (roles is Iterable<*>) {
                    roles as Iterable<String>
                } else {
                    emptyList()
                }
            } ?: emptyList()

            UserData(
                    it.attributes["preferred_username"]?.toString() ?: "",
                    it.attributes["email"]?.toString() ?: "",
                    authRoles.toList()
            )
        }
        return AuthData(
                "/oauth/login/keycloak",
                "/logout",
                "https://sso.nyomio.local/auth/realms/nyomio/protocol/openid-connect/logout?redirect_uri=[base_url]/logout",
                userData)
    }
}
