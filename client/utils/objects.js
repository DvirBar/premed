export const findKeyByNestedValue = (obj, nestedKey, nestedValue) => {
    let found;
    
    for(let key in obj) {
        if(obj[key][nestedKey] === nestedValue) {
            found = key;
            break;
        }
    }

    return found;
}