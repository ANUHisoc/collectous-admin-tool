
import { Column, Table, SCHEMA } from "../../common/schema";
import { isArrayEqual } from "../../common/util";
import {InvalidPrimaryKey} from "../../common/error"



// Helper functions which do not cause any side effect



function getColumnIndex(table:Table,column:Column){
    return SCHEMA[table].columns.indexOf(column);
}


function isColumnInTable(table:Table,column:Column){
    return column in SCHEMA[table].columns;
}

export function isPrimaryKey(table:Table,primaryKey:Column[]){
    return isArrayEqual(SCHEMA[table].primaryKey, primaryKey)
}
