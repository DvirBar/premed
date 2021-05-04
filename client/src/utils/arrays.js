/* 
* This function gets and array and a value. 
* If the value exists in the array it will be removed.
* Else, it will be added to the array.
*/ 
export const addOrRemove = (arr, val) => {
    if(arr.includes(val)) {
        return arr.filter(arrItem => arrItem !== val)
    }

    return [...arr, val]
}