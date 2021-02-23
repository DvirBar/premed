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
    userId, 
    isAdmin,
    adminAllowed) => {

    const modelName = model.schema.options.modelName

    const modelUser = model.user._id || model.user
    // Log this incidence
    if(modelUser.toString() !== userId && (!adminAllowed || !isAdmin)) {
        throw `Security error: a user tried to modify or 
        get resource (${modelName}) that they do not own`
    }
}