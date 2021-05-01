import { getError, getMessage } from '../actions/messages'
import {
    LOADING,
    SUCCESS,
    FAILURE
} from './types'

export const loaderLoading = (trigger, field, group) => dispatch => {
    dispatch({
        type: LOADING,
        trigger,
        field,
        group
    })
}

export const loaderSuccess = (trigger, message, field, group) => dispatch => {
    const actionDispatch = {
        type: SUCCESS,
        trigger,
        field,
        group
    }

    if(message) {
        if(message.isGlobal) {
            dispatch(getMessage(message.text))
        }
        
        else {
            actionDispatch.message = message.text
        }
    }
    
    dispatch(actionDispatch)
}

export const loaderFailure = (trigger, message, field, group) => dispatch => {
    const actionDispatch = {
        type: FAILURE,
        trigger,
        field,
        group
    }

    if(message) {
        if(message.isGlobal) {
            dispatch(getError(message.text))
        }
        
        else {
            actionDispatch.message = message.text
        }
    }
    
    dispatch(actionDispatch)
}