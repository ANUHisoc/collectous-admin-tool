
export function prettyPrint(array:string[]):string[]{
    return array.map(element=> element.replace('_'," "));
}