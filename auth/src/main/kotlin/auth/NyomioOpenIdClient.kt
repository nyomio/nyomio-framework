package auth

import io.micronaut.context.BeanContext
import io.micronaut.context.annotation.Replaces
import io.micronaut.security.oauth2.client.DefaultOpenIdClient
import io.micronaut.security.oauth2.client.OpenIdProviderMetadata
import io.micronaut.security.oauth2.configuration.OauthClientConfiguration
import io.micronaut.security.oauth2.endpoint.AuthenticationMethod
import io.micronaut.security.oauth2.endpoint.DefaultSecureEndpoint
import io.micronaut.security.oauth2.endpoint.SecureEndpoint
import io.micronaut.security.oauth2.endpoint.authorization.request.AuthorizationRedirectHandler
import io.micronaut.security.oauth2.endpoint.authorization.response.OpenIdAuthorizationResponseHandler
import io.micronaut.security.oauth2.endpoint.endsession.request.EndSessionEndpoint
import io.micronaut.security.oauth2.endpoint.token.response.OpenIdUserDetailsMapper
import java.util.stream.Collectors
import javax.inject.Singleton

@Singleton
@Replaces(bean = DefaultOpenIdClient::class)
class NyomioOpenIdClient
constructor(clientConfiguration: OauthClientConfiguration?,
            private val openIdProviderMetadata: OpenIdProviderMetadata?,
            userDetailsMapper: OpenIdUserDetailsMapper?,
            redirectUrlBuilder: AuthorizationRedirectHandler?,
            authorizationResponseHandler: OpenIdAuthorizationResponseHandler?,
            beanContext: BeanContext?,
            endSessionEndpoint: EndSessionEndpoint?)
    : DefaultOpenIdClient(clientConfiguration, openIdProviderMetadata,
        userDetailsMapper, redirectUrlBuilder, authorizationResponseHandler,
        beanContext, endSessionEndpoint) {

    override fun getTokenEndpoint(): SecureEndpoint {
        val authMethodsSupported = openIdProviderMetadata?.tokenEndpointAuthMethodsSupported
        var authenticationMethods: List<AuthenticationMethod?>? = null
        if (authMethodsSupported != null) {
            authenticationMethods = authMethodsSupported.stream()
                    .map { obj: String -> obj.toUpperCase() }
                    .map { name: String? -> try{AuthenticationMethod.valueOf(name!!)} catch (e: Exception) {AuthenticationMethod.NONE} }
                    .collect(Collectors.toList())
        }
        return DefaultSecureEndpoint(openIdProviderMetadata?.tokenEndpoint ?: "", authenticationMethods)    }

}
