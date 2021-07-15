
function capitalizeFirstLetter(text:string) {
    return text[0].toUpperCase() + text.slice(1);
}

export function prettyPrintNames(array:any[]):string[]{
    return array.map(element=> capitalizeFirstLetter(element.toString().replace('_'," ")));
}

export function prettyPrintName(name:string):string{
    return capitalizeFirstLetter(name.toString().replace('_'," "));
}


