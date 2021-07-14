// TODO: come up with custom error classes
export class InvalidResourceError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "InvalidResourceError";
    }
}


export class DataCorruptError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "DataCorruptError";
    }
}


export class InvalidPrimaryKey extends Error{
    constructor(message: string) {
        super(message);
        this.name = "InvalidPrimaryKey";
    }


}

export class InvalidSearchQuery extends Error{
    constructor(message: string) {
        super(message);
        this.name = "InvalidSearchQuery";
    }


}