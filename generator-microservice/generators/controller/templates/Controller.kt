package admin.<%= entityNameL1 %>

import io.micronaut.http.annotation.Controller
import io.micronaut.http.annotation.Get
import io.micronaut.security.annotation.Secured
import io.micronaut.security.rules.SecurityRule
import nyomio.commons.revisionedentity.BaseController

@Controller("/api/v1/admin/<%= entityNameL1 %>")
@Secured(SecurityRule.IS_AUTHENTICATED)
class <%= entityNameU1 %>Controller
constructor(private val <%= entityNameL1 %>DbService: <%= entityNameU1 %>RevisionedDbService)
    : BaseController<<%= entityNameU1 %>, <%= entityNameU1 %>Table>(<%= entityNameL1 %>DbService) {

}
