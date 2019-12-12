package nyomio.dbutils

import org.jetbrains.exposed.sql.Query

fun Query.renderResult(stripPackage: String = ""): String {
    val colSet = this.set.fields
    val sb = StringBuilder()

    // Table header
    colSet.forEach {
        val colName = it.toString()
        val stripped = colName.replace(stripPackage, "")
        sb.append(stripped.toCell(20))
    }
    sb.appendln()

    // Table content
    sb.append(
            this.joinToString("\n") { col ->
                colSet.joinToString("") { expr ->
                    "${col[expr]}".toCell(20)
                }
            })

    return sb.toString()
}

private fun String.toCell(length: Int): String {
    return (if (this.length > length)
        "…" + this.substring(this.length - length + 1, this.length)
    else
        this.padEnd(length)) + " | "
}
