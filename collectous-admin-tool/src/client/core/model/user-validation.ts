import { makeObservable, observable, action, onBecomeObserved, onBecomeUnobserved, makeAutoObservable } from "mobx"
import server from '../../utils/server';

const { serverFunctions } = server;

export class UserValidation {
    isAuthenticating:boolean
    isValidUser:boolean

    constructor(){
        this.isValidUser = false
        makeAutoObservable(this)  
        this.checkUser()
    }

    checkUser(){
        serverFunctions.getUserEmail()
        .then(result=> {console.log(result)})
        .catch(error => {console.log(error)})
    }

}