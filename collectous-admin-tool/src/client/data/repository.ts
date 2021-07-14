
import { InvalidPrimaryKey } from "../../common/error";
import { Column, Table, SCHEMA } from "../../common/schema";
import { isArrayEqual } from "../../common/util";
import server from '../server';

const { serverFunctions } = server;

type SearchQuery = {
    primarykey: Column[], value: any[];
};

export class Repository {

    private static _instance: Repository = new Repository();
    private dataObject!: { [table in Table]: { data: object[][], lastModified: Date } };

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

    private getRowIndex(table:Table,query:SearchQuery) {

        if(isArrayEqual(SCHEMA[table].primaryKey,query.)){
            
        }
        throw new InvalidPrimaryKey("Given primary key"+ query.primaryKey+" is invalid.")
  
    }

    public async fetchData(table: Table): Promise<object[][]> {
        var recentlastModified:Date = await this.fetchLastModified(table)
       // console.log("this recent modified "+recentlastModified);
       // console.log("this last modified "+this.dataObject[table].lastModified )
        if (this.dataObject[table].lastModified === undefined
            || recentlastModified > this.dataObject[table].lastModified) {

           // console.log("Actually fetching data")
            return serverFunctions.getData(table)
                .then((result: object[][]) => {
                    this.updateDataObject(table, result, recentlastModified)
                    return result;
               
                });

        } else {

            //console.log("Returning cache")
            return new Promise(() => { return this.dataObject[table].data })
        }

    }

    private updateDataObject(table: Table, data?: object[][], lastModified?: Date) {
        if (data !== undefined) {
            this.dataObject[table].data = data
        }
        if (lastModified !== undefined) {
            this.dataObject[table].lastModified = lastModified
        }
    }

    private async fetchLastModified(table: Table): Promise<Date> {
        return serverFunctions.
            getLastModified(table)
            .then((result:string)=> {
            //    console.log("result: "+result)
                return new Date(result)})
    }






}