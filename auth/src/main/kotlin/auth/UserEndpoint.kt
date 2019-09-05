package auth

import io.micronaut.http.MediaType
import io.micronaut.http.annotation.Controller
import io.micronaut.http.annotation.Get
import io.micronaut.security.annotation.Secured
import io.micronaut.security.authentication.Authentication
import io.micronaut.security.rules.SecurityRule

data class UserData(val authObject: Authentication?, val loginUrl: String, val logoutUrl: String)

@Controller("/user")
class UserEndpoint {

    @Get("/")
    @Secured(SecurityRule.IS_ANONYMOUS)
    fun index(auth: Authentication?) = UserData(auth, "https://app.nyomio.local/oauth/login/keycloak", "https://app.nyomio.local/logout")
}
