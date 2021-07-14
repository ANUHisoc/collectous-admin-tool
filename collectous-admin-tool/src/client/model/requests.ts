import { makeObservable, observable, action, onBecomeObserved, onBecomeUnobserved } from "mobx"

import { prettyPrint } from './util'

import server from '../server';
import { FetchedData, Repository, SearchQuery } from "../data/repository"
const { serverFunctions } = server;

export class RequestModel {
    private interval: number
    private isFetching: boolean

    header: any[]
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
        this.isFetching = false;
        this.fetchData()
        onBecomeObserved(this, "rows", this.resume)
        onBecomeUnobserved(this, "rows", this.suspend)
    }

    updateIsOptionsSelected(selectedRows: []) {
        this.isOptionsSelected = selectedRows.length !== 0
    }

    accept(gmailAddresses: string[]) {
        //TODO: inject files to members  
        console.log("accepting address" + gmailAddresses)
        for (let gmailAddress in gmailAddresses) {
            serverFunctions
                .injectTemplates(gmailAddress)
                .then(result => {
                    console.log(result)
                })
                .then(this.removeRow(gmailAddress))
                .catch(error => console.log(error))
        }

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
        console.log("resume")
        this.fetchData()
        this.interval = setInterval(() => this.fetchData(), 7500)
    }

    suspend = () => {
        console.log("suspend")
        this.header = undefined
        this.rows = undefined
        clearInterval(this.interval)
        this.isLoading = true
    }


    fetchData(isForced=false){
        console.log("Fetching data")
        if (!this.isOptionsSelected) {
            if (isForced || !this.isFetching) {
                console.log("isForced " +isForced)
                Repository
                    .getInstance()
                    .fetchData("requests",isForced)
                    .then((data: FetchedData) => {
                        // TODO: Check if data has changed or not before assigning value
                        this.header = prettyPrint(data.columns)
                        this.rows = data.rows
                        this.isLoading = false
                        this.isFetching = false
                    })
                    .catch(error => console.error("Error retrieving request data " + error.toString()))
            }
        }
    }

}