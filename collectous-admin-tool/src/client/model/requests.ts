import { makeObservable, observable, action, onBecomeObserved, onBecomeUnobserved } from "mobx"

import { prettyPrintNames, prettyPrintName } from './util'

import server from '../server';
import { FetchedData, Repository, SearchQuery } from "../data/repository"
import { Column } from "../../common/schema";
import { getRowIndex } from "../data/repository-util";
const { serverFunctions } = server;

export class RequestModel {
    private interval: number
    private isDataShown: boolean
     columns:Column[]
    rows:any[][]
    isLoading: boolean
    isOptionsSelected: boolean

    constructor() {
        makeObservable(this, {
            columns: observable,
            rows: observable,
            isLoading: observable,
            isOptionsSelected: observable,
            accept: action,
            reject: action,
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
        this.columns=[]
        this.rows=[[]]
        this.fetchData()
        this.interval = setInterval(() => this.fetchData(), 7500)
    }


    suspend = () => {
        //console.log("suspend")
        this.columns= undefined
        this.rows= undefined
        clearInterval(this.interval)
        this.isLoading = true
        this.isDataShown = false
    }


    updateIsOptionsSelected(selectedRows: []) {
        this.isOptionsSelected = selectedRows.length !== 0
    }


    async accept(gmailAddresses: string[]) {
        //TODO: inject files to members  
        //console.log("accepting address" + gmailAddresses)
        var result = true;
        gmailAddresses.forEach((gmailAddress) =>
            serverFunctions
                .injectTemplates(gmailAddress)
                .then(result => {
                    this.removeRow(gmailAddress)
                    
                })
                .catch(error => console.log(error)))
    }

    async reject(gmailAddresses: string[]) {
        //TODO: Show Snackbars
        console.log("rejecting row" + gmailAddresses)
        gmailAddresses.forEach((gmailAddress) => this.removeRow(gmailAddress))
        console.log("rejected")
    }

    private async removeRow(gmailAddress: string) {
        console.log("removing row" + gmailAddress)
        var query: SearchQuery = { primaryKey: ["gmail"], value: [gmailAddress] };
        var rowIndex = Repository.getInstance().getRowIndex("requests",query)
        console.log(rowIndex)
        this.rows = this.rows.filter((_value,index)=>{ return index!=rowIndex})
        await Repository
            .getInstance()
            .deleteRow("requests", query, rowIndex)
        this.fetchData(true)
    }




    private fetchData(isForced = false) {
        console.log("Fetching data")
        if (!this.isOptionsSelected) {
            // console.log("isForced " + isForced)
            Repository
                .getInstance()
                .fetchData("requests", isForced,this.isDataShown)
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