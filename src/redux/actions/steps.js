import {
    STEP_LOADING,
    STEP_SUCCESS,
    STEP_ERROR,
    STEP_ADD,
    STEP_UPDATE,
    STEP_DELETE
} from './types';
import axios from 'axios';
import { getMessage, getError } from './messages';

// Basic types
export const stepLoad = () => {
    return {
        type: STEP_LOADING
    }
}

export const stepSuccess = steps => {
    return {
        type: STEP_SUCCESS,
        payload: steps
    }
}

export const stepError = () => {
    return {
        type: STEP_ERROR
    }
}

export const stepAdd = step => {
    return {
        type: STEP_ADD,
        payload: step
    }
}

export const stepUpdate = step => {
    return {
        type: STEP_UPDATE,
        payload: step
    }
}

export const stepDelete = id => {
    return {
        type: STEP_DELETE,
        payload: id
    }
}

// Get all steps
export const getSteps = () => dispatch => {
    dispatch(stepLoad());

    axios.get('api/steps')
         .then(res => dispatch(stepSuccess(res.data)))
         .catch(err => {
             dispatch(stepError());
             dispatch(getError(err));
         });
}

// Create new step
export const addStep = data => dispatch => {
    dispatch(stepLoad());
    console.log(data)

    // Request body
    const body = JSON.stringify(data);

    axios.post('api/steps', body)
         .then(res => dispatch(stepAdd(res.data)))
         .catch(err => {
            dispatch(stepError())
            dispatch(getError(err))
         })
}

export const editStep = (id, data) => dispatch => {
    dispatch(stepLoad());
    
    // Request body
    const body = JSON.stringify(data);

    axios.put(`api/steps/${id}`, body)
         .then(res => dispatch(stepUpdate(res.data)))
         .catch(err => {
            dispatch(getError(err))
            dispatch(stepError())
         })
}

export const deleteStep = id => dispatch => {
    dispatch(stepLoad());

    axios.delete(`api/steps/${id}`)
         .then(res => {
             dispatch(stepDelete(id));
             dispatch(getSteps());
             dispatch(getMessage(res.data));
         })
         .catch(err => {
            dispatch(getError(err))
            dispatch(stepError())
         })
}

