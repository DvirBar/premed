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

export const checkOwnedResource = (
    model,
    owner, 
    userId, 
    isAdmin,
    adminAllowed) => {
    const modelName = model.schema.options.modelName

    // Log this incident
    if(!owner.equals(userId)) {
        if(!isAdmin || (isAdmin && !adminAllowed) ) {
            throw `Security error: a user tried to modify or 
        get resource (${modelName}) that they do not own`
        }
    }

    return true;
}