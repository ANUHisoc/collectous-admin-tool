import { Table } from "../common/schema";
import { FOLDER_MIME_TYPE, getFolderUnderParentFolder, getParentFolder, getCurrentScriptFile, copyContent, getFileUnderParentFolder } from "./drive-utils";
import Folder = GoogleAppsScript.Drive.Folder;
import File = GoogleAppsScript.Drive.File;



const ADMIN_FOLDER_NAME = "admin";
const DATA_COLLECTOR_TEMPLATE_FOLDER_NAME = "data-collector-template"
const APP_NAME = "Collectous";

function getCollectorsFolderIterator() {
    return DriveApp.searchFolders(
        "sharedWithMe and title contains '" + APP_NAME + "' and mimeType = '" + FOLDER_MIME_TYPE + "'");
}


export function getCollectorFolder(gmailAddress: string):  Folder {
    var folderIterator = DriveApp.searchFolders(
        "sharedWithMe and title contains '" + APP_NAME + "' and mimeType = '" + FOLDER_MIME_TYPE + "'" + "and '" + gmailAddress + "' in owners")
    if (folderIterator.hasNext()) {
        return folderIterator.next();
    }
}


export function getAdminFolder() {
    // TODO: Consider the situation where admin is not the actual owner of the running script
    return getFolderUnderParentFolder(ADMIN_FOLDER_NAME, getParentFolder());
}


export function getLastModified(table:Table):string {
    return getAdminSpreadSheetFile(table).getLastUpdated().toString();
}


export function getAdminSpreadSheetFile(table:Table):File{
   return getFileUnderParentFolder(table, getAdminFolder());
}


export function injectTemplates(gmailAddress: string) {
    var folder = getCollectorFolder(gmailAddress);
    Logger.log(gmailAddress)
    Logger.log(folder)
    copyContent(getDataCollectorTemplateFolder(), folder)
}


function getDataCollectorTemplateFolder(): Folder {
    return getFolderUnderParentFolder(DATA_COLLECTOR_TEMPLATE_FOLDER_NAME, getParentFolder());
}


// TODO: Get Collectors's collectous folder, given a gmail address.

// TODO: Get Collectous (Data collector) folder.

// TODO: Get Collectous (Admin) folder.

// TODO: Check if Collectous admin folder created by script owner, given nothing and return bool.

// TODO: Check if current user is in the data collector file, given the user's gmail address.


// TODO: Finalise data folder heirarchy for 4 type of people 
// 1) script owner 2) admin and collector 3) collector 4) admin: collectous
// 1) collectous? -- collectous-admin-tool | collectous-collected? 
// 2) same as 1) but collectous-admin-tool under shared with me.
// 3) collectous-collected
// 4) Nothing, only collectous-admin-tool under shared with me