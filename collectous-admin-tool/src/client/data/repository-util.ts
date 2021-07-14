
import { Column, Table, SCHEMA } from "../../common/schema";
import { isArrayEqual } from "../../common/util";
import {InvalidPrimaryKey} from "../../common/error"

function remove(table: Table, primaryKey: Column[]) {
    if (isPrimaryKey(table,primaryKey)) {
        

    }
    else
        throw new InvalidPrimaryKey(primaryKey.toString())
}






function getColumnIndex(table:Table,column:Column){
    return SCHEMA[table].columns.indexOf(column);
}


function isColumnInTable(table:Table,column:Column){
    return column in SCHEMA[table].columns;
}

function isPrimaryKey(table:Table,primaryKey:Column[]){
    return isArrayEqual(SCHEMA[table].primaryKey, primaryKey)
}
