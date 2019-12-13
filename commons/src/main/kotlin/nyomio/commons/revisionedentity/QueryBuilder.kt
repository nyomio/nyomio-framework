package nyomio.commons.revisionedentity

import org.jetbrains.exposed.sql.*

fun Query.atTimestamp(timestamp: Long): Query {
    return QueryBuilder.atTimestamp(timestamp, this)
}

fun Query.filter(table: EntityTable, filter: String?): Query {
    return QueryBuilder.filter(table, this, filter)
}

class QueryBuilder {
    companion object {

        /**
         * Adds joins and where clauses all the target tables, so that only the rows live at the
         * given timestamp will be returned.
         */
        fun atTimestamp(timestamp: Long, query: Query): Query {
            var i = 1
            query.targets.forEach {
                val entityTbl = it as EntityTable
                val revAlias = RevisionTable.alias("rev$i")
                val revEndAlias = RevisionEndTable.alias("revEnd$i")

                query.adjustColumnSet { join(revAlias, JoinType.INNER, entityTbl.revisionId, revAlias[RevisionTable.id]) }
                query.adjustColumnSet { join(revEndAlias, JoinType.LEFT, entityTbl.revisionId, revEndAlias[RevisionEndTable.revisionId]) }
                query.andWhere {
                    revAlias[RevisionTable.timestamp] lessEq timestamp and
                            ((revEndAlias[RevisionEndTable.timestamp] greater timestamp)
                                    or revEndAlias[RevisionEndTable.timestamp].isNull())
                }
                i++
            }
            return query
        }

        fun filter(table: EntityTable, query: Query, filter: String?): Query {
            return if (filter == null || filter == "") {
                return query
            } else {
                query.andWhere {
                    table.columns.fold(Op.FALSE as Op<Boolean>) { op, col ->
                        var newOp: Op<Boolean> = op
                        when (col.columnType) {
                            is StringColumnType -> {
                                col as Column<String>
                                newOp = op or (col like "%$filter%")
                            }
                            is IntegerColumnType -> {
                                try {
                                    col as Column<Int>
                                    newOp = op or (col eq filter.toInt())
                                } catch (e: NumberFormatException) {
                                }
                            }
                            is DoubleColumnType -> {
                                try {
                                    col as Column<Double>
                                    newOp = op or (col eq filter.toDouble())
                                } catch (e: NumberFormatException) {
                                }
                            }
                            is FloatColumnType -> {
                                try {
                                    col as Column<Float>
                                    newOp = op or (col eq filter.toFloat())
                                } catch (e: NumberFormatException) {
                                }
                            }
                            is LongColumnType -> {
                                try {
                                    col as Column<Long>
                                    newOp = op or (col eq filter.toLong())
                                } catch (e: NumberFormatException) {
                                }
                            }
                        }
                        newOp
                    }

                }
            }
        }
    }
}

