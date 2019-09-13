package auth

import io.micronaut.http.MediaType
import io.micronaut.http.annotation.Controller
import io.micronaut.http.annotation.Get
import io.micronaut.security.annotation.Secured
import io.micronaut.security.authentication.Authentication
import io.micronaut.security.rules.SecurityRule

data class UserData(val loginUrl: String, val logoutUrl: String, val ssoLogoutUrl: String, val authObject: Authentication?)

@Controller("/api")
class UserEndpoint {

    @Get("/user")
    @Secured(SecurityRule.IS_ANONYMOUS)
    fun index(auth: Authentication?)
            = UserData(
            "https://app.nyomio.local/oauth/login/keycloak",
            "https://app.nyomio.local/logout",
            "https://sso.nyomio.local/auth/realms/nyomio/protocol/openid-connect/logout?redirect_uri=https://app.nyomio.local/logout",
            auth)
}
