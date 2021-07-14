
export const TABLES = ["requests", "data-collector"] as const;
export const REQUEST = ["gmail", "name", "time_stamp", "folder_id"] as const;
export const DATA_COLLECTOR = ["gmail", "name", "time_stamp", "folder_id", "contact_number", "other_details"] as const;

export type Table = typeof TABLES[number];
export type Request = typeof REQUEST[number];
export type DataCollector = typeof DATA_COLLECTOR[number];

export type Column = Request | DataCollector


interface MetaData {
    table: Table,
    columns: readonly any[],
    primaryKey: Column[]
}


export const SCHEMA: { [table in Table]: MetaData } =
{
    "requests":
    {
        table: "requests",
        columns: REQUEST,
        primaryKey: ["gmail"] // TODO: Possibly use time_stamp as well in case of the need for a history feature
    },

    "data-collector": {
        table: "requests",
        columns: REQUEST,
        primaryKey: ["gmail"]
    }

}

