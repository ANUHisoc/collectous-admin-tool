import * as Util from "./utils"

// TODO handle errors;
const REQUESTS_FILE_NAME = "requests";




function getRequestSheetFile() {
    return Util.getFileUnderParentFolder(REQUESTS_FILE_NAME, Util.getAdminFolder());
}



function gatherRequest() {

    console.log()
    // TODO: Update new collectors in the requestSheet
}

export const getRequestData = () => {
    var requestSpreadsheet = SpreadsheetApp.open(getRequestSheetFile());
    return requestSpreadsheet.getDataRange().getValues();
}

function addNewCollectorToRequestSheet(files) {
    // TODO:add created at, name of the collector, gmail address.
}


function getNewCollectors() {
    // TODO
}


