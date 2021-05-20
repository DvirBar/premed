
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

export const arrayToObject = (arr, keyName) => {
    return arr.reduce((map, objItem) => {
        map[objItem[keyName]] = objItem.content
        return map
    }, {})
}

export const isDeepEqual = (value1, value2) => {
    // If both values are objects
    if(typeof value1 === 'object' &&
    typeof value2 === 'object') {
        /* If the keys length is not the same, 
        the objects are not equal */
        if(Object.keys(value1).length !== 
            Object.keys(value2).length) {
            return false
        }

        /* We iterate the object keys, and 
        call deepEqual each time. if one of the values is false, 
        we return false.
        if we finished the loop, we can return true */
        for(let key in value1) {
            const isEqual = isDeepEqual(value1[key], value2[key])
            if(!isEqual) {
                return false
            }
        }

        return true
    }
    
    return value1 === value2

}