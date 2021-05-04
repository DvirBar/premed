/*
*   Used to find a text and deletes it the first 
*   time it appears
*
*   @param  (arr)  The array to search in
*   @param  (text) The text to search
*   
*   @return <bool> Returns if the text was found or not
*/
export const findTextAndDelete = (arr, text) => {
    let found = false
    const index = arr.findIndex(arrItem => 
        String(arrItem) === text)

    // If the item was found
    if(index !== -1) {
        arr.splice(index, 1)
        found = true
    }

    return found
}