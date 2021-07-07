import * as  Sheets from "../sheets"
import { getHeaderValue, getColumn } from "../sheets-utils"
import { isArrayEqual} from "../util"

export const REQUEST_SHEET_HEADER = ["gmail", "name", "time_stamp"]
const REQUEST_SHEET_HEADER_INDEX= REQUEST_SHEET_HEADER.reduce((accumulatedObj, currentValue, index) =>
        (accumulatedObj[currentValue] = index+1, accumulatedObj), {})

export function rejectRequests(gmailAddresses: string[]) {
    processRequest(gmailAddresses, false);
}


export function acceptRequests(gmailAddresses: string[]) {
    processRequest(gmailAddresses, true);
}

// TODO: consider data collectors to have multiple devices later
function processRequest(gmailAddresses: string[], isAccepted: Boolean) {
    var requestSheet = SpreadsheetApp.open(Sheets.getRequestSheetFile()).getActiveSheet();
    // transfer row to data collector and make sure that 
    Logger.log(gmailAddresses)

}