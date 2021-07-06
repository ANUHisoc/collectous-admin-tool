import * as  Sheets from "./sheets"
import { getHeaderValue, getColumn } from "./sheets-utils"
import { isArrayEqual} from "./util"

export const REQUEST_SHEET_HEADER = ["gmail", "name", "time_stamp", "is_accepted"]
const REQUEST_SHEET_HEADER_INDEX= REQUEST_SHEET_HEADER.reduce((accumulatedObj, currentValue, index) =>
        (accumulatedObj[currentValue] = index+1, accumulatedObj), {})

export function rejectRequests(gmailAddresses: string[]) {
    updateRequests(gmailAddresses, false);
}


export function acceptRequests(gmailAddresses: string[]) {
    updateRequests(gmailAddresses, true);
}


function updateRequests(gmailAddresses: string[], isAccepted: Boolean) {
    var requestSheet = SpreadsheetApp.open(Sheets.getRequestSheetFile()).getActiveSheet();
    // var header = getHeaderValue(requestSheet);
    //console.assert(isArrayEqual(Object.keys(REQUEST_SHEET_HEADER), header), "Columns not equal.");
    Logger.log(gmailAddresses)

    var gmailColumnIndex = REQUEST_SHEET_HEADER_INDEX["gmail"];
    var isAcceptedColumnIndex = REQUEST_SHEET_HEADER_INDEX["is_accepted"]
    var storedGmailAddresses = getColumn(requestSheet, gmailColumnIndex);
    Logger.log(gmailColumnIndex)
    Logger.log(isAcceptedColumnIndex)
    Logger.log(storedGmailAddresses)

    gmailAddresses.map(gmailAddress =>
        storedGmailAddresses.findIndex(gmail =>
            gmail === gmailAddress))
        .filter(index => // removing those invalid indices which are caused by the address not being in the Gsheet
            index !== -1)
        .forEach(rowIndex =>{
            Logger.log(rowIndex+" "+ isAcceptedColumnIndex);
            requestSheet.getRange(rowIndex+2, isAcceptedColumnIndex).setValue(isAccepted);
        })
}