import { makeObservable, observable, action, onBecomeObserved, onBecomeUnobserved, makeAutoObservable } from "mobx"
import server from '../../utils/server';

const { serverFunctions } = server;

export class UserValidationModel {
    isAuthenticating: boolean
    isValidUser: boolean

    constructor() {
        makeObservable(this, {
            isAuthenticating: observable,
            isValidUser: observable,
        })
        this.isValidUser = false
        this.isAuthenticating = true
        this.checkUser()
    }

    checkUser() {
        serverFunctions.isAdmin()
            .then(result => {
                // Some latency to show loading 
                setInterval(() => {this.isValidUser = result
                    this.isAuthenticating = false}, 2000)
            })
            .catch(error => {

            })
    }

}