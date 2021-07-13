

import { getAdminFolder } from "./drive";
import { getFileUnderParentFolder } from "./drive-utils";
import { Table } from "../common/schema";

import Folder = GoogleAppsScript.Drive.Folder;
import File = GoogleAppsScript.Drive.File;

// TODO: handle errors;






function insert(table: Table) {
    // TODO
}


function remove(table: Table) {
    // TODO
}


export function getData(table: Table) {
    var spreadSheetFile = getFileUnderParentFolder(table, getAdminFolder())
    var sheet = SpreadsheetApp.open(spreadSheetFile).getActiveSheet();
    return sheet.getDataRange().getValues()
}

function update(table: Table) {
    // TODO
}

export function getSheetFile(table:Table):File {
    return getFileUnderParentFolder(table, getAdminFolder());
}


function gatherRequest() {
    // TODO: Update new collectors in the requestSheet ( NOTE: THis will be also used for time triggered events)
}



function addNewCollectorToRequestSheet(files) {
    // TODO:add created at, name of the collector, gmail address.
}


function getNewCollectors() {
    // TODO
}


