import { getCurrentScriptFile } from "./drive-utils";


export function  getUserEmail(){ 
    return Session.getActiveUser().getEmail(); }

export function getScriptOwnerEmail():string{
    return getCurrentScriptFile().getOwner().getEmail()
}


export function isAdmin() {
    try {
        getCurrentScriptFile()
        return true;
    }
    catch {
        return false
    }
}