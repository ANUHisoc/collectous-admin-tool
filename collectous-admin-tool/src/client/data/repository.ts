
import { values, _endAction } from "mobx";
import { InvalidPrimaryKey, InvalidSearchQuery } from "../../common/error";
import { Column, Table, SCHEMA } from "../../common/schema";
import { isArrayEqual } from "../../common/util";
import server from '../server';
import { intersection } from "lodash"

const { serverFunctions } = server;

export type SearchQuery = {
    primaryKey: Column[], value: any[];
};

export type FetchedData = {
    columns: Column[], rows: object[][]
}


export class Repository {

    private static _instance: Repository = new Repository();
    private dataObject!: { [table in Table]: { data: FetchedData, lastModified: Date } };

    private constructor() {
        if (Repository._instance) {
            throw new Error("Dev error: Use Repository.getInstance() instead of new.");
        }

        Repository._instance = this;

        this.dataObject = {
            "requests": { data: undefined, lastModified: undefined },
            "data-collector": { data: undefined, lastModified: undefined },
        }
    }


    public static getInstance(): Repository {
        return Repository._instance;
    }

    // Query uses primaryKey so there will only be one row.
    public getRowIndex(table: Table, query: SearchQuery) {
        var primaryKey = query.primaryKey
        if (isArrayEqual(SCHEMA[table].primaryKey, primaryKey)) {
            var primaryKeyLength = primaryKey.length
            console.log(query)
            if (query.value.length === primaryKeyLength) {
                var rows = this.dataObject[table].data.rows
                for (let i = 0; i < rows.length; i++) {
                    if (intersection(rows[i], query.value).length === primaryKeyLength) {
                        return i;
                    }
                }
            }
            
            throw new InvalidSearchQuery("Given query is " + query.toString())
        }
        throw new InvalidPrimaryKey("Given primary key" + primaryKey + " is invalid.")
    }


    public deleteRow(table: Table, query: SearchQuery,rowIndex?:number):Promise<void> {
        if(rowIndex===undefined){
            rowIndex =this.getRowIndex(table,query)
        }
        return serverFunctions.deleteRow(table,rowIndex+2)
    }

    public async fetchData(table: Table): Promise<FetchedData> {
        var recentlastModified: Date = await this.fetchLastModified(table)
        console.log("this recent modified "+recentlastModified);
        console.log("this last modified "+this.dataObject[table].lastModified )
        if (this.dataObject[table].lastModified === undefined
            || recentlastModified > this.dataObject[table].lastModified) {

            console.log("Actually fetching data")
            return serverFunctions.getData(table)
                .then((result: object[][]) => {
                    this.updateDataObject(table, result, recentlastModified)
                    return this.dataObject[table].data;

                });

        } else {

            console.log("Returning cache")
            return new Promise(() => { return this.dataObject[table].data; })
        }

    }

    private updateDataObject(table: Table, data?: object[][], lastModified?: Date) {
        if (data !== undefined) {
            var columnName: Column[] = data[0].map(value => (value as unknown as Column))
            this.dataObject[table].data = { columns: columnName, rows: data.splice(1) }
        }
        if (lastModified !== undefined) {
            this.dataObject[table].lastModified = lastModified
        }
    }

    private async fetchLastModified(table: Table): Promise<Date> {
        return serverFunctions.
            getLastModified(table)
            .then((result: string) => {
                //    console.log("result: "+result)
                return new Date(result)
            })
    }






}