
import { getAdminFolder } from "./drive";
import {getFileUnderParentFolder } from "./drive-utils";
import {REQUEST_SHEET_HEADER} from "./handler/request"


// TODO handle errors;
const REQUESTS_FILE_NAME = "requests";





export function getRequestSheetFile() {
    return getFileUnderParentFolder(REQUESTS_FILE_NAME, getAdminFolder());
}


function gatherRequest() {

    console.log()
    // TODO: Update new collectors in the requestSheet
}

export const getRequestData = () => {
    var requestSpreadsheet = SpreadsheetApp.open(getRequestSheetFile()).getActiveSheet();
    return requestSpreadsheet.getDataRange().getValues();
}

function addNewCollectorToRequestSheet(files) {
    // TODO:add created at, name of the collector, gmail address.
}


function getNewCollectors() {
    // TODO
}


