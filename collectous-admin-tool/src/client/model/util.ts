
function capitalizeFirstLetter(text:string) {
    return text[0].toUpperCase() + text.slice(1);
}

export function prettyPrint(array:any[]):string[]{
    return array.map(element=> capitalizeFirstLetter(element.toString().replace('_'," ")));
}

