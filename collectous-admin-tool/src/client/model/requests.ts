import { makeObservable, observable, action, onBecomeObserved, onBecomeUnobserved } from "mobx"

import { prettyPrintNames, prettyPrintName } from './util'

import server from '../server';
import { FetchedData, Repository, SearchQuery } from "../data/repository"
import { Column } from "../../common/schema";
const { serverFunctions } = server;

export class RequestModel {
    private interval: number
    private isDataShown: boolean

    header: Column[]
    rows: any[][]
    isLoading: boolean
    isOptionsSelected: boolean



    constructor() {
        makeObservable(this, {
            header: observable,
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
        this.header = []
        this.rows = [[]]
        onBecomeObserved(this, "rows", this.resume)
        onBecomeUnobserved(this, "rows", this.suspend)
    }

    updateIsOptionsSelected(selectedRows: []) {
        this.isOptionsSelected = selectedRows.length !== 0
    }

    accept(gmailAddresses: string[]) {
        //TODO: inject files to members  
        //console.log("accepting address" + gmailAddresses)
        gmailAddresses.forEach((gmailAddress) =>
            serverFunctions
                .injectTemplates(gmailAddress)
                .then(result => {
                    console.log(result)
                })
                .then(this.removeRow(gmailAddress))
                .catch(error => console.log(error)))



    }

    async removeRow(gmailAddress: string) {
        var repository = Repository.getInstance();
        console.log("removing row" + gmailAddress)
        var query: SearchQuery = { primaryKey: ["gmail"], value: [gmailAddress] };
        var rowIndex = repository.getRowIndex("requests", query);
        console.log(rowIndex)
        // console.log(this.rows.splice(rowIndex, 1))
        // this.rows = this.rows.splice(rowIndex, 1)
        await Repository
            .getInstance()
            .deleteRow("requests", query, rowIndex)
        this.fetchData(true)
    }


    reject(gmailAddresses: string[]) {
        //TODO: Show Snackbars
        console.log("rejecting row" + gmailAddresses)
        gmailAddresses.forEach((gmailAddress) => this.removeRow(gmailAddress))
        console.log("rejected")
    }

    resume = () => {
        //console.log("resume")
        this.header = []
        this.rows = [[]]
        this.fetchData()
        this.interval = setInterval(() => this.fetchData(), 7500)
    }

    suspend = () => {
        //console.log("suspend")
        this.header = undefined
        this.rows = undefined
        clearInterval(this.interval)
        this.isLoading = true
        this.isDataShown = false
    }


    fetchData(isForced = false) {
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
                        this.header = data.columns
                        this.rows = data.rows
                        this.isLoading = false
                        this.isDataShown = true
                    }
                })
                .catch(error => console.error("Error retrieving request data " + error.toString()))

        }
    }

}