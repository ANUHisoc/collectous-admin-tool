
import { makeObservable, observable, action, onBecomeObserved, onBecomeUnobserved, makeAutoObservable } from "mobx"
import server from '../../utils/server';
import { prettyPrint } from '../util'

const { serverFunctions } = server;

export class Login {
    isValidUser:boolean

    constructor(){
        this.isValidUser = false
        makeAutoObservable(this)  
    }

    

}