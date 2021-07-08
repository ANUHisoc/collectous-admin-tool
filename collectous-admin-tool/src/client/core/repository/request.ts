import { makeObservable, observable, action, onBecomeObserved, onBecomeUnobserved } from "mobx"
import server from '../../utils/server';
import {prettyPrint} from '../util'

const { serverFunctions } = server;

export class RequestStore {
   header: string[]
   rows: string[][]
   interval: number


    constructor() {

        makeObservable(this, {
            header: observable,
            rows: observable,
            accept: action,
            reject: action,
            resume: false,
            suspend: false
        })
        
        this.fetchData()
        onBecomeObserved(this, "rows", this.resume)
        onBecomeUnobserved(this, "rows", this.suspend)
    }

    accept() {
       console.log("accepted")
    }

    reject(){
        console.log("rejected")
    }

    resume = () => {
       
        this.interval = setInterval(() => this.fetchData(), 5000)
    }

    suspend = () => {
        this.header = undefined
        this.rows = undefined 
        clearInterval(this.interval)
    }

    fetchData = () => {
        console.log("Fetching data")
        serverFunctions.getRequestData()
        .then(result=> { 
            console.log(result)
            this.header = prettyPrint(result[0])
            this.rows = result.splice(1)
        })
        .catch( error => console.error("Error retrieving request data " + error.toString()))

    }

}