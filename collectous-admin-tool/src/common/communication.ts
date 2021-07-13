

// Follows a scheme like the HTTP response code
const ResponseStatus:{[status:string]:number} = {
    "STATUS_OK": 200,
    "INVALID_FILE": 501,
    "INVALID_FOLDER": 502,
} as const


export type ResponseCode = keyof typeof ResponseStatus


type Packet = { responseCode: ResponseCode, payload: any }



