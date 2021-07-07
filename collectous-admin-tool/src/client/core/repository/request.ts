import { makeObservable, observable, action } from "mobx"



export class RequestStore {
   header: string[]
   rows: string[][]


    constructor(header,rows) {

        makeObservable(this, {
            header: observable,
            rows: observable,
            accept: action,
            reject: action
        })
        
        this.header = header
        this.rows = rows
    }

    accept() {
       console.log("accepted")
    }

    reject(){
        console.log("rejected")
    }

}