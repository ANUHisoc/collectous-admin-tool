
import { REQUEST } from "../../common/schema";
import { getAdminSpreadSheetFile } from "../drive";
import * as  Sheets from "../sheets"



const REQUEST_SHEET_HEADER_INDEX= REQUEST.reduce((accumulatedObj, currentValue, index) =>
        (accumulatedObj[currentValue] = index+1, accumulatedObj), {})

export function rejectRequests(gmailAddresses: string[]) {
    processRequest(gmailAddresses, false);
}


export function acceptRequests(gmailAddresses: string[]) {
    processRequest(gmailAddresses, true);
}

// TODO: consider data collectors to have multiple devices later
function processRequest(gmailAddresses: string[], isAccepted: Boolean) {
    var requestSheet = SpreadsheetApp.open(getAdminSpreadSheetFile("requests")).getActiveSheet();
    // transfer row to data collector and make sure that 
    Logger.log(gmailAddresses)

}