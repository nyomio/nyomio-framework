package admin

import com.nimbusds.jwt.JWT
import com.nimbusds.jwt.JWTClaimsSet
import io.micronaut.context.annotation.Replaces
import io.micronaut.security.authentication.Authentication
import io.micronaut.security.token.jwt.validator.DefaultJwtAuthenticationFactory
import io.micronaut.security.token.jwt.validator.JwtAuthenticationFactory
import org.slf4j.LoggerFactory
import java.text.ParseException
import java.util.*
import javax.inject.Singleton

@Singleton
@Replaces(bean = DefaultJwtAuthenticationFactory::class)
class NyomioJwtAuthenticationFactory : JwtAuthenticationFactory {
    private val logger = LoggerFactory.getLogger(NyomioJwtAuthenticationFactory::class.java)

    override fun createAuthentication(token: JWT): Optional<Authentication> {
        try {
            val claimSet = token.jwtClaimsSet
            return Optional.of(NyomioClaimSetAdapter(claimSet))
        } catch (e: ParseException) {
            if (logger.isErrorEnabled) {
                logger.error("ParseException creating authentication", e.message)
            }
        }
        return Optional.empty()
    }
}

class NyomioClaimSetAdapter
constructor(private val claimSet: JWTClaimsSet?) : Authentication {

    override fun getName() = claimSet?.subject

    override fun getAttributes(): MutableMap<String, Any> =
            if (claimSet == null) {
                HashMap()
            } else {
                try {
                    // Here we can filter additional claims or even add some typed magic to the
                    // Authentication object
                    claimSet.claims
                            .filter { it.key != "resource_access" }
                            .toMutableMap()
                } catch (e: Exception) {
                    claimSet.claims
                }

            }
}


