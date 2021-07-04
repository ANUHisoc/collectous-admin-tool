import * as  Sheets from "./sheets"
import * as Util from "./sheets-utils"
import * as SheetQuery from "sheetquery"
import { sheets } from "jss"
export function rejectRequests(gmailAddresses:string[]){
    updateRequests(gmailAddresses,false)
}


export function acceptRequests(gmailAddresses:string[]){
    updateRequests(gmailAddresses,true)
}


function updateRequests(gmailAddresses:string[],isAccepted:boolean){
    var requestSheet =  SpreadsheetApp.open(Sheets.getRequestSheetFile())
        var query = SheetQuery.sheetQuery(requestSheet)
        .where((row)=> row.gmail === gmailAddresses[0])
        .updateRows(row => { row.is_accepted = isAccepted.toString() });   
}