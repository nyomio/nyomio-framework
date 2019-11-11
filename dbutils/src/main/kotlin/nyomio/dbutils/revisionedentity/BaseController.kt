package nyomio.dbutils.revisionedentity

import io.micronaut.http.annotation.Delete
import io.micronaut.http.annotation.Get
import io.micronaut.http.annotation.PathVariable
import io.micronaut.http.annotation.Put
import io.micronaut.security.annotation.Secured
import io.micronaut.security.rules.SecurityRule

@Secured(SecurityRule.IS_AUTHENTICATED)
abstract class BaseController <E : Entity, T : EntityTable>
constructor(private val baseDbService: RevisionedQueryDbServiceBaseService<E, T>){

    @Get(uri = "/all{/filter}")
    fun list(@PathVariable("filter") filter: String?) = baseDbService.listAll(filter=filter)

    @Get(uri = "/all-at/{timestamp}{/filter}")
    fun listAt(@PathVariable("timestamp") timestamp: Long, @PathVariable("filter") filter: String?) = baseDbService.listAll(timestamp, filter)

    @Get(uri = "/{id}")
    fun getById(id: Long) = baseDbService.getById(id)

    @Delete(uri = "/{id}")
    @Secured("admin")
    fun deleteById(id: Long) = baseDbService.delete(id)

    @Put(uri = "/")
    @Secured("admin")
    fun add(entity: E) =
            if (entity.id == 0L)
                baseDbService.add(entity)
            else {
                baseDbService.edit(entity)
                entity.id
            }

}
