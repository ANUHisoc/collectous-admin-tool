
// TODO handle errors;


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
export function getFileUnderParentFolder(REQUESTS_FILE_NAME: string, arg1: any) {
    throw new Error("Function not implemented.");
}

export function getAdminFolder(): any {
    throw new Error("Function not implemented.");
}

