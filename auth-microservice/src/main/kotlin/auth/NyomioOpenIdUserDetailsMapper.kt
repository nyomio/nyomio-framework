package auth

import io.micronaut.security.oauth2.configuration.OpenIdAdditionalClaimsConfiguration
import io.micronaut.security.oauth2.endpoint.token.response.DefaultOpenIdUserDetailsMapper
import io.micronaut.security.oauth2.endpoint.token.response.OpenIdClaims
import io.micronaut.security.oauth2.endpoint.token.response.OpenIdTokenResponse
import net.minidev.json.JSONArray
import net.minidev.json.JSONObject
import javax.inject.Named
import javax.inject.Singleton

@Singleton
@Named("keycloak")
class NyomioOpenIdUserDetailsMapper(openIdAdditionalClaimsConfiguration: OpenIdAdditionalClaimsConfiguration)
    : DefaultOpenIdUserDetailsMapper(openIdAdditionalClaimsConfiguration) {

    override fun buildAttributes(providerName: String?, tokenResponse: OpenIdTokenResponse?, openIdClaims: OpenIdClaims?): MutableMap<String, Any> {
        return super.buildAttributes(providerName, tokenResponse, openIdClaims).apply {
            this.remove("resource_access")
        }
    }

    override fun getRoles(providerName: String?, tokenResponse: OpenIdTokenResponse?, openIdClaims: OpenIdClaims?): MutableList<String> {
        val roles = (((openIdClaims?.claims
                ?.get("resource_access") as JSONObject?)
                ?.get("nyom-app") as JSONObject?)
                ?.get("roles") as JSONArray?)
                ?.mapTo(mutableListOf()) {
                    it as String
                }

        return roles ?: mutableListOf()
    }
}
