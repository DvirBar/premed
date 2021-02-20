export const checkRequiredVars = required => {
    let notFound = null

    for(let key in required) {
        if(!required[key] || !required[key] === '') {
            notFound = key
            break;
        }
    }

    if(notFound) {
        throw `required variable ${notFound} is missing`
    }
}