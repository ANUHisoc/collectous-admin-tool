
import { values, _endAction } from "mobx";
import { InvalidPrimaryKey, InvalidSearchQuery } from "../../common/error";
import { Column, Table, SCHEMA } from "../../common/schema";
import { isArrayEqual } from "../../common/util";
import server from '../server';
import { intersection } from "lodash"
import {  getRowIndex, isPrimaryKey } from "./repository-util";

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
// Helper functions which do not cause any side effect
 public getRowIndex(table: Table, query: SearchQuery):number {
    return getRowIndex(table,query,this.dataObject[table].data)
}


    public deleteRow(table: Table, query: SearchQuery, rowIndex?: number): Promise<void> {
        if (rowIndex === undefined) {
            rowIndex = this.getRowIndex(table, query)
        }
        // Adding 2 cause of the header and G sheet index schematics
        return serverFunctions.deleteRow(table, rowIndex + 2)
    }

    /**
     * Fetches data asynchronously and assumes that caller is efficient and returns nothing if there are no changes.
     * @param table 
     * @param isForced 
     * @param isEfficientFetch 
     * @returns 
     */
    public async fetchData(table: Table, isForced?: boolean, isEfficientFetch = true): Promise<FetchedData> {
        var recentLastModified: Date = await this.fetchLastModified(table)
        //console.log("this recent modified " + recentastModified);
        //console.log("this last modified " + this.dataObject[table].lastModified)
        if (isForced || this.dataObject[table].lastModified === undefined
            || recentLastModified > this.dataObject[table].lastModified) {

            //console.log("Actually fetching data")
            return serverFunctions.getData(table)
                .then((result: object[][]) => {
                    this.updateDataObject(table, result, recentLastModified)
                    return this.dataObject[table].data;
                });

        } 
        else {
            var data = isEfficientFetch? undefined : this.dataObject[table].data
           // console.log("Returning cache or nothing")
            return new Promise<FetchedData>(
                (resolve, _reject: any) => {
                    resolve(data)
                }
            ).then((result) => {
                return result;
            })
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