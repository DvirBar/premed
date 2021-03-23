/**
 * This function removes a type item from the array. 
 * 
 * @param arr(Array): The array to remove item from
 * @param item(String | Number): The item to remove 
 * @param key?(String): If specified, item will be treated as refrential. 
 *                      If not, it will be treated as primitive
 * 
 * @returns: a new array without item
 **/

export const removeFromArray = (arr, item, key) => {
    const index = arr.findIndex(thisItem => key 
        ? thisItem[key] === item[key] 
        : thisItem === item)

    if(index === -1) {
        return arr
    }

    // We are using slice to keep the function pure
    return arr.slice(index, index + 1)
}
