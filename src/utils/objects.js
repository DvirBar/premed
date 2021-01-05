
// Check if an object is empty
export const isObjEmpty = obj => {
    return Object.keys(obj).length === 0
}

// Check that an object only has the keys requested
export const checkObjectKeys = (obj, keys) => {
    let success = true
    const objKeys = Object.keys(obj)

    /* check that requested keys size is equal 
    to object keys size */
    success = keys.length === objKeys.length

    if(success) {
        // Check that all key are in object
        for(let key of keys) {
            if(!objKeys.find(objKey => objKey === key)) {
                success = false
                break;
            }
        }
    }
    
    return success
}
