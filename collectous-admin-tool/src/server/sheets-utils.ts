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

export function getColumnMap(activeSheet) {
    var columnMap: { [columnName: string]: number } = {};
    var columnNames = getHeaderValue(activeSheet)
    columnNames.forEach((element, index) => {
        columnMap[element] = index + 1
    });
    return columnMap;
}

export function getHeaderValue(activeSheet): [] {
    return activeSheet.getRange(1, 1).getDataRegion(SpreadsheetApp.Dimension.COLUMNS).getValues()[0];
}

export function getRow(activeSheet, rowIndex): [] {
    var lastColumn = activeSheet.getDataRange().getLastColumn()
    return activeSheet.getRange(rowIndex, 1, 1, lastColumn)
        .getValues()[0]
}

export function getColumn(activeSheet, columnIndex, isIncludingHeader?: boolean): [] {
    var rowIndex = isIncludingHeader ? 1 : 2;
    var lastRow = activeSheet.getDataRange().getLastRow()
    return activeSheet.getRange(rowIndex, columnIndex, lastRow, 1)
        .getValues()
        .flat()
}
