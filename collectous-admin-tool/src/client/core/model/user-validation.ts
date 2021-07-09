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
        // TODO: check folder for admin, that is shared by the owner, who happens to be the owner of the script as well. 
        // Then check data-collector file and match current user email id. 
        
        // TODO: Clarify on -- Not sure if file would be accesible via web app if it is under view-access
        serverFunctions.getUserEmail()
        .then(result=> {console.log(result)})
        .catch(error => {console.log(error)})
    }

}