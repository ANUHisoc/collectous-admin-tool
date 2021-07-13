
import Sheet = GoogleAppsScript.Spreadsheet.Sheet
// TODO handle errors;


export function getColumnMap(activeSheet:Sheet) {
    var columnMap: { [columnName: string]: number } = {};
    var columnNames = getHeaderValue(activeSheet)
    columnNames.forEach((element, index) => {
        columnMap[element.toString()] = index + 1
    });
    return columnMap;
}


export function getHeaderValue(activeSheet:Sheet):object[] {
    return activeSheet.getRange(1, 1).getDataRegion(SpreadsheetApp.Dimension.COLUMNS).getValues()[0];
}


export function getRow(activeSheet:Sheet, rowIndex:number): object[] {
    var lastColumn = activeSheet.getDataRange().getLastColumn()
    return activeSheet.getRange(rowIndex, 1, 1, lastColumn)
        .getValues()[0]
}


export function getColumn(activeSheet:Sheet, columnIndex:number, isIncludingHeader = false): object[] {
    var rowIndex = isIncludingHeader ? 1 : 2;
    var lastRow = activeSheet.getDataRange().getLastRow()
    return activeSheet.getRange(rowIndex, columnIndex, lastRow, 1)
        .getValues()
        .flat()
}


