

// Follows a scheme like the HTTP response code.
/* TODO: Research on whether this way is better or having a suite of custom error classes and throwing errors would be better;
         Also, need to know how interpret the error from the promises. How about a hybrid approach? 
         Why hybrid - public server functions to send response code and low level ones to throw errors
*/
type Status = "STATUS_OK"| "INVALID_FILE"|"INVALID_FOLDER"
const ResponseStatus:{[status in Status]:number} = {
    "STATUS_OK": 200,
    "INVALID_FILE": 501,
    "INVALID_FOLDER": 502,
} as const


export type ResponseCode = keyof typeof ResponseStatus


export type Packet = { responseCode: ResponseCode, payload?: any }

export function isPacket(possiblePacket:any):boolean{
    return (<Packet>possiblePacket).responseCode !== undefined;
}

