import { FOLDER_MIME_TYPE, getFolderUnderParentFolder, getParentFolder, getCurrentScriptFile } from "./drive-utils";
import Folder = GoogleAppsScript.Drive.Folder;


const ADMIN_FOLDER_NAME = "admin";
const APP_NAME = "Collectous";

export function getCollectorsFolderIterator() {
    return DriveApp.searchFolders(
        "sharedWithMe and title contains '" + APP_NAME + "' and mimeType = '" + FOLDER_MIME_TYPE + "'");
}

export function getAdminFolder() {
    // TODO: Consider the situation where admin is not the actual owner of the running script
    return getFolderUnderParentFolder(ADMIN_FOLDER_NAME, getParentFolder());
}

export function getLastModified(): Date {
    // TODO
    return undefined
}


export function injectTemplates(gmailAddresses: string[]): boolean {
    // TODO : return true if successfully injected
    return false;
}

function getCollectorFolder(gmail: string): Folder {
    return undefined;
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
// 4) Nothing, only collectous-admin-tool under shared with me.
