import { FOLDER_MIME_TYPE, getFolderUnderParentFolder, getParentFolder } from "./drive-utils";

const ADMIN_FOLDER_NAME = "admin";
const APP_NAME = "Collectous";

export function getCollectorsFolderIterator() {
    return DriveApp.searchFolders(
        "sharedWithMe and title contains '" + APP_NAME + "' and mimeType = '" + FOLDER_MIME_TYPE + "'");
}

export function getAdminFolder() {
    return getFolderUnderParentFolder(ADMIN_FOLDER_NAME, getParentFolder());
}

// TODO: Finalise data folder heirarchy for 4 type of people 
// 1) script owner 2) admin and collector 3) collector 4) admin: collectous
// 1) collectous? -- collectous-admin-tool | collectous-collected? 
// 2) same as 1) but collectous-admin-tool under shared with me.
// 3) collectous-collected
// 4) Nothing, only collectous-admin-tool under shared with me.


// TODO: Inject files to collector's collectuous folder, given a set of gmail addresses.

// TODO: Get Collectors's collectous folder, given a gmail address.

// TODO: Get Collectous (Data collector) folder.

// TODO: Get Collectous (Admin) folder.

// TODO: Check if Collectous admin folder created by script owner, given nothing and return bool.

// TODO: Check if current user is in the data collector file, given the user's gmail address.