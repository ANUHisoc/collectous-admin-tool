import { makeObservable, observable, action, onBecomeObserved, onBecomeUnobserved } from "mobx"
import server from '../../utils/server';
import { prettyPrint } from '../util'

const { serverFunctions } = server;

export class RequestStore {
    header: string[]
    rows: string[][]
    interval: number
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

    accept() {
        console.log("accepted")
    }

    reject() {
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

    fetchData = () => {
        console.log("Fetching data")
        if (!this.isOptionsSelected) {
            serverFunctions.getRequestData()
                .then(result => {
                    console.log(result)
                    this.header = prettyPrint(result[0])
                    this.rows = result.splice(1)
                    this.isLoading = false
                })
                .catch(error => console.error("Error retrieving request data " + error.toString()))

        }
    }

}