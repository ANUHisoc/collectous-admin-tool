
function capitalizeFirstLetter(text:string) {
    return text[0].toUpperCase() + text.slice(1);
}

export function prettyPrint(array:string[]):string[]{
    return array.map(element=> capitalizeFirstLetter(element.replace('_'," ")));
}

