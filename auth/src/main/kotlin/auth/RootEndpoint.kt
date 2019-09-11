package auth

import io.micronaut.http.HttpRequest
import io.micronaut.http.HttpResponse
import io.micronaut.http.annotation.Controller
import io.micronaut.http.annotation.Get
import io.micronaut.http.server.netty.NettyHttpRequest
import io.micronaut.security.annotation.Secured
import io.micronaut.security.rules.SecurityRule
import java.net.URI

@Controller("/")
class RootEndpoint {
    @Get("/")
    @Secured(SecurityRule.IS_ANONYMOUS)
    fun index(request: HttpRequest<*>): HttpResponse<String> {
        val redirectTo = ((request as NettyHttpRequest<*>).nettyRequest.headers()["Referer"] ?: "").let {
            when {
                it.contains("app.nyomio.local") -> if (it.contains("oauth")) "/user" else it
                else -> "/user"
            }
        }
        return HttpResponse.temporaryRedirect(URI(redirectTo))
    }
}
