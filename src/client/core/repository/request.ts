import { makeObservable, observable, action } from "mobx"

class Request {
    gmail:string = ""
    name:string = ""
    timeStamp:Date = null
    isAccepted:Boolean = null


    constructor(name,gmail,timeStamp,isAccepted) {
        makeObservable(this, {
            name: observable,
            gmail: observable,
            isAccepted: observable,
            accept: action,
            reject: action
        })
        
        this.gmail = gmail;
        this.name = name;
        this.timeStamp = timeStamp;
        this.isAccepted = isAccepted
    }

    accept() {
       
    }

    reject(){

    }

}