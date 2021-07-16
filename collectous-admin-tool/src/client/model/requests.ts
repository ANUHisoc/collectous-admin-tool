import { makeObservable, observable, action, onBecomeObserved, onBecomeUnobserved } from "mobx"

import { prettyPrintNames, prettyPrintName } from './util'

import server from '../server';
import { FetchedData, Repository, SearchQuery } from "../data/repository"
import { Column } from "../../common/schema";
import { getRowIndex } from "../data/repository-util";
const { serverFunctions } = server;


const FETCHING_INTERVAL_TIME = 7500 
const VOID_PROCESSING_INTERVAL_TIME = 2500 

type MetaData = {gmailAddress:string,query:SearchQuery,rowIndex:number}
export class RequestModel {
    private interval: number
    private isDataShown: boolean
    
    columns: Column[]
    rows: any[][]
    isLoading: boolean
    isOptionsSelected: boolean

    constructor() {
        makeObservable(this, {
            columns: observable,
            rows: observable,
            isLoading: observable,
            isOptionsSelected: observable,
            acceptRequest: action,
            rejectRequest: action,
            resume: false,
            suspend: false
        })
        this.isLoading = true
        this.isOptionsSelected = false
        this.isDataShown = false;
        this.columns = []
        this.rows = [[]]
        onBecomeObserved(this, "rows", this.resume)
        onBecomeUnobserved(this, "rows", this.suspend)
    }


    resume = () => {
        //console.log("resume")
        this.columns = []
        this.rows = [[]]
        this.fetchData()
        this.interval = setInterval(() => this.fetchData(), 7500)
    }


    suspend = () => {
        //console.log("suspend")
        this.columns = undefined
        this.rows = undefined
        clearInterval(this.interval)
        this.isLoading = true
        this.isDataShown = false
    }


    updateIsOptionsSelected(selectedRows: []) {
        this.isOptionsSelected = selectedRows.length !== 0
    }


    async acceptRequests(gmailAddresses: string[]): Promise<boolean> {
        //TODO: inject files to members  
        //console.log("accepting address" + gmailAddresses)
        var gmailAddressMetaData = this.getMetaDataForRequestUpdate(gmailAddresses)
        const promises = gmailAddressMetaData.map(async metaData => {
           return await this.acceptRequest(metaData)
        })
        await this.pause(VOID_PROCESSING_INTERVAL_TIME)
        return Promise.all(promises)
            .then(() => { return true; })
           .catch(()=>{ return false;})
        
    }

    acceptRequest(metadata:MetaData) {
        return serverFunctions.injectTemplates(metadata.gmailAddress)
            .then(this.removeRow(metadata))
            .catch((error: any)=> { throw error})
    }


    async rejectRequests(gmailAddresses: string[]): Promise<boolean> {
        //TODO: Show Snackbars
        console.log("rejecting row" + gmailAddresses)
        var gmailAddressMetaData = this.getMetaDataForRequestUpdate(gmailAddresses)
        const promises = gmailAddressMetaData.map(async metaData => {
            this.rejectRequest(metaData)
        })
        await this.pause(VOID_PROCESSING_INTERVAL_TIME)
        return Promise.all(promises).
            then(() => { return true })
            .catch(() => { return false })
    }


    rejectRequest(metadata:{gmailAddress:string,query:SearchQuery,rowIndex:number}) {
        return new Promise<void>((resolve) => {
            this.removeRow(metadata)
            resolve()
        }).catch((error: any)=> { throw error})
    }

    pause(time:number) {
        return new Promise(resolve =>
             setTimeout(resolve, time));
      }

    getMetaDataForRequestUpdate(gmailAddresses:string[]){
        return gmailAddresses.map(gmailAddress => {
            var query: SearchQuery = { primaryKey: ["gmail"], value: [gmailAddress] };
            var rowIndex = Repository.getInstance().getRowIndex("requests", query)
            console.log(rowIndex)
            this.rows = this.rows.filter((_value, index) => { return index != rowIndex })
            return {gmailAddress:gmailAddress, query:query,rowIndex:rowIndex}
        });
    }



    private async removeRow(metaData:MetaData) {
        console.log("removing row" + metaData.gmailAddress)
        await Repository
            .getInstance()
            .deleteRow("requests", metaData.query, metaData.rowIndex)
        this.fetchData(true)
    }




    private fetchData(isForced = false) {
        console.log("Fetching data")
        if (!this.isOptionsSelected) {
            // console.log("isForced " + isForced)
            Repository
                .getInstance()
                .fetchData("requests", isForced, this.isDataShown)
                .then((data: FetchedData) => {
                    // TODO: Check if data has changed or not before assigning value
                    // console.log(data)
                    if (data !== undefined) {
                        this.columns = data.columns
                        this.rows = data.rows
                        this.isLoading = false
                        this.isDataShown = true
                    }
                })
                .catch(error => console.error("Error retrieving request data " + error.toString()))

        }
    }

}