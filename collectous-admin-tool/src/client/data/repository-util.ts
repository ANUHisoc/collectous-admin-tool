
import { Column, Table, SCHEMA } from "../../common/schema";
import { isArrayEqual } from "../../common/util";
import {InvalidPrimaryKey, InvalidSearchQuery} from "../../common/error"
import { SearchQuery, FetchedData } from "./repository";
import {intersection} from "lodash"



// Helper functions which do not cause any side effect
export function getRowIndex(table: Table, query: SearchQuery,data:FetchedData) {
    var primaryKey = query.primaryKey
    if (isPrimaryKey(table, primaryKey)) {
        var primaryKeyLength = primaryKey.length
        //console.log(query)
        if (query.value.length === primaryKeyLength) {
            var rows = data.rows

            for (let rowIndex = 0; rowIndex < rows.length; rowIndex++) {
                // TODO: iterate though values in rows instead if performance is an issue
                if (intersection(rows[rowIndex], query.value).length === primaryKeyLength) {
                    return rowIndex;
                }
            }
        }

        throw new InvalidSearchQuery("Given query is " + query.toString())
    }
    throw new InvalidPrimaryKey("Given primary key" + primaryKey + " is invalid.")
}

function getColumnIndex(table:Table,column:Column){
    return SCHEMA[table].columns.indexOf(column);
}


function isColumnInTable(table:Table,column:Column){
    return column in SCHEMA[table].columns;
}

export function isPrimaryKey(table:Table,primaryKey:Column[]){
    return isArrayEqual(SCHEMA[table].primaryKey, primaryKey)
}
