import { makeObservable, observable, action, onBecomeObserved, onBecomeUnobserved } from "mobx"

import { prettyPrint } from './util'

import { Table } from "../../common/schema";
import server from '../server';
import {Repository} from "../data/repository"
const { serverFunctions } = server;

export class RequestModel {
    private interval: number
    

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
        this.fetchData()
        onBecomeObserved(this, "rows", this.resume)
        onBecomeUnobserved(this, "rows", this.suspend)
    }

    updateIsOptionsSelected(selectedRows: []) {
        this.isOptionsSelected = selectedRows.length !== 0
    }

    accept(gmailAddresses: string[]) {
        //TODO: inject files to members  
        for (let gmailAddress in gmailAddresses) {
            serverFunctions.injectTemplates(gmailAddress)
                .then(result => {
                    console.log(result)


                })
                .catch(error => console.log(error))
        }
    }

    reject() {
        //TODO: Show Snackbars
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

    /* Transferring some load from the server to the client, 
       given that there are limitations on server operations and google could put extra limitations.
       See limitations: https://developers.google.com/apps-script/guides/services/quotas#current_limitations */
    processData() {
        //TODO: extract folder ids.

    }

    fetchData = () => {
        console.log("Fetching data")
        if (!this.isOptionsSelected) {
            Repository
            .getInstance()
            .fetchData("requests")
                .then(result => {
                    //console.log(result)
                    this.header = prettyPrint(result[0])
                    this.rows = result.splice(1)
                    this.isLoading = false
                })
                .catch(error => console.error("Error retrieving request data " + error.toString()))

        }
    }

}