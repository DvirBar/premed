export const loaderTypes = {
    loading: 'LOADING',
    success: 'SUCCESS',
    failure: 'FAILURE'
}

export const setLoader = (type, message, field, group) => {
    const obj = {
        type,
        loader: {}
    }

    if(message) {
        obj.loader.message = message
    }

    if(field) {
        obj.loader.field = field
    }

    if(group) {
        obj.loader.group = group
    }

    return obj
}

