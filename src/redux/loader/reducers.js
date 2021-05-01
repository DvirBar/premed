import { GET_USER } from "../auth/types"
import { LOADING } from "./types"

// Helper functions
const setLoaderBase = (requestStatus, loader) => ({
    status: requestStatus,
    message: loader?.message
})

const setLoaderField = (state, requestStatus, loader) => ({
    ...state,
    [loader.field]: {
        ...setLoaderBase(requestStatus, loader)
    }
})

const setLoaderGroup = (actionState, requestStatus, loader) => ({
    ...actionState,
    [loader.group]: {
        ...setLoaderField(actionState[loader.group], requestStatus, loader)
    }
})

const setLoader = (state, requestStatus, loader) => {
    if(loader?.group) return setLoaderGroup(state, requestStatus, loader)
    if(loader?.field) return setLoaderField(state, requestStatus, loader)
    else return setLoaderBase(requestStatus, loader)
}

const initialState = {
    [GET_USER]: {
        status: LOADING
    }
}

export default function(state = initialState, action) {
    const matches = /(.*)_(LOADING|SUCCESS|FAILURE)/.exec(action.type);

    if(!matches) return state

    const [, requestName, requestStatus] = matches
    return {
        ...state,
        [requestName]: setLoader(state[requestName] || {}, requestStatus, action.loader)
    }
}