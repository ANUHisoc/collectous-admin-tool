

import { getAdminFolder, getAdminSpreadSheetFile } from "./drive";
import { getFileUnderParentFolder } from "./drive-utils";
import { Column, SCHEMA, Table } from "../common/schema";

import Folder = GoogleAppsScript.Drive.Folder;
import File = GoogleAppsScript.Drive.File;
import { isArrayEqual } from "../common/util";

// TODO: handle errors;






function insert(table: Table) {
    // TODO
}

export function deleteRow(table:Table,rowIndex:number){
    var sheet = SpreadsheetApp.open(getAdminSpreadSheetFile(table)).getActiveSheet();
    sheet.deleteRow(rowIndex);
}

function remove(table: Table, isEntireRow:boolean) {
// TODO: Use Sheet deleteRow() if isEntireRow
}


export function getData(table: Table) {
    var sheet = SpreadsheetApp.open(getAdminSpreadSheetFile(table)).getActiveSheet();
    return sheet.getDataRange().getValues();
}


function update(table: Table) {
    // TODO
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


