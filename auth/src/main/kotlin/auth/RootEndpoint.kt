package auth

import io.micronaut.http.HttpResponse
import io.micronaut.http.annotation.Controller
import io.micronaut.http.annotation.Get
import io.micronaut.security.annotation.Secured
import io.micronaut.security.rules.SecurityRule
import java.net.URI

@Controller("/")
class RootEndpoint {
    @Get("/")
    @Secured(SecurityRule.IS_ANONYMOUS)
    fun index(): HttpResponse<String> {
        return HttpResponse.temporaryRedirect(URI("/user"))
    }
}
