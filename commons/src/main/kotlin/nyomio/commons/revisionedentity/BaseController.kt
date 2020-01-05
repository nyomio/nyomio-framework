package nyomio.commons.revisionedentity

import io.micronaut.http.annotation.Delete
import io.micronaut.http.annotation.Get
import io.micronaut.http.annotation.PathVariable
import io.micronaut.http.annotation.Put
import io.micronaut.security.annotation.Secured
import io.micronaut.security.rules.SecurityRule

@Secured(SecurityRule.IS_AUTHENTICATED)
abstract class BaseController <E : Entity, T : EntityTable>
constructor(protected val baseDbService: BaseDbService<E, T>){

    @Get(uri = "/all")
    open fun list() = baseDbService.listAll()

    @Get(uri = "/all-at/{timestamp}{/filter}")
    open fun listAt(@PathVariable("timestamp") timestamp: Long, @PathVariable("filter") filter: String?) =
            baseDbService.listAll(timestamp, filter)

    @Get(uri = "/by-id/{id}{/timestamp}")
    open fun getById(@PathVariable("id") id: Long, @PathVariable("timestamp") timestamp: Long?) =
            baseDbService.getById(id, timestamp ?: System.currentTimeMillis())

    @Delete(uri = "/{id}")
    @Secured("admin")
    open fun deleteById(id: Long) = baseDbService.delete(id)

    @Put(uri = "/")
    @Secured("admin")
    open fun add(entity: E) =
            if (entity.id == 0L)
                baseDbService.add(entity)
            else {
                baseDbService.edit(entity)
                entity.id
            }

}
