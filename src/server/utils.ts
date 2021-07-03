const APP_NAME = "Collectous";
const FOLDER_MIME_TYPE = "application/vnd.google-apps.folder";
const SHEETS_MIME_TYPE = "application/vnd.google-apps.spreadsheet";
const ADMIN_FOLDER_NAME = "admin";

// TODO handle errors;
export function getCollectorsFolderIterator() {
    return DriveApp.searchFolders(
        "sharedWithMe and title contains '" + APP_NAME + "' and mimeType = '" + FOLDER_MIME_TYPE + "'");
}

export function getAdminFolder() {
    return getFolderUnderParentFolder(ADMIN_FOLDER_NAME, getParentFolder());
}

export function getParentFolder() {
    return DriveApp.getFileById(ScriptApp.getScriptId()).getParents().next();
}


export function getFileUnderParentFolder(fileName, parentFolder) {
    return parentFolder.searchFiles("title contains '" + fileName + "'").next();
}


export function getFolderUnderParentFolder(fileName, parentFolder) {
    return parentFolder.searchFolders("title contains '" + fileName + "'").next();
}