
export function isArrayEqual<T>(firstArray: T[], secondArray: T[]) {
    return (firstArray.length == secondArray.length) &&
        firstArray.every(function (element, index) {
            return element === secondArray[index];
        });
}

export function removeItem<T>(array: Array<T>, value: T): Array<T> { 
    const index = array.indexOf(value);
    if (index > -1) {
      array.splice(index, 1);
    }
    return array;
  }


