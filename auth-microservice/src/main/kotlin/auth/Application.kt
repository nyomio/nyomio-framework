package auth

import io.micronaut.runtime.Micronaut

object Application {

    @JvmStatic
    fun main(args: Array<String>) {
        Micronaut.build()
                .packages("auth")
                .mainClass(Application.javaClass)
                .start()
    }
}