import { config } from "react-transition-group"
import { Column } from "../../common/schema"
import { prettyPrintName } from "../model/util"

export type DataTableColumnConfig = { name: string, options: { display: boolean } }


function convertToDataTableConfig(columnNames: Column[]): DataTableColumnConfig[] {
    return columnNames.map(columnName => { return { name: columnName, options: { display: true } } })
}

export function hideDataTableColumn(columns: Column[], column: Column) {
    var configs = convertToDataTableConfig(columns)
    configs.forEach(config => { if (config.name === column) { config.options.display = false } })
    return prettyPrintDataTable(configs);
}


function prettyPrintDataTable(dataTableConfigs: DataTableColumnConfig[]) {
    dataTableConfigs.forEach((config) => { config.name = prettyPrintName(config.name) })
    return dataTableConfigs;
}