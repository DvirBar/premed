import {
    STEP_LOADING,
    STEP_SUCCESS,
    STEP_ERROR,
    STEP_ADD,
    STEP_UPDATE,
    STEP_DELETE,
    STEP_ADD_LINK_INFO,
    STEP_ADD_DESC_GROUP,
    STEP_ADD_UNI_CONTENT
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
export const getSteps = (pathId, uniIds) => dispatch => {
    dispatch(stepLoad());

    const body = JSON.stringify({
        pathId,
        uniIds
    })

    axios.post('api/steps', body)
         .then(res => dispatch(stepSuccess(res.data)))
         .catch(err => {
             dispatch(stepError());
             dispatch(getError(err));
         });
}

// Create new step
export const addStep = data => dispatch => {
    dispatch(stepLoad());

    // Request body
    const body = JSON.stringify(data);

    axios.post('api/steps/addStep', body)
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

export const addLinkInfo = (id, data) => dispatch => {
    // Request body
    const body = JSON.stringify(data)

    axios.put(`api/steps/${id}/addLinkInfo`, body)
         .then(res => dispatch({
            type: STEP_ADD_LINK_INFO,
            payload: {
                id,
                linkInfo: res.data
            }}))
         .catch(err => {
             dispatch(getError(err))
             dispatch(stepError())
         })
}

export const addDescGroup = (id, data) => dispatch => {
    // Request body
    const body = JSON.stringify(data)

    axios.put(`api/steps/${id}/addDescGroup`, body)
         .then(res => dispatch({
            type: STEP_ADD_DESC_GROUP,
            payload: {
                id,
                desc: res.data
            }}))
         .catch(err => {
             dispatch(getError(err))
             dispatch(stepError())
         })
}

export const addUniContent = (id, uniId, data) => dispatch => {
    // Request body
    const body = JSON.stringify(data)

    axios.put(`api/steps/${id}/${uniId}/addUniContent`, body)
         .then(res => dispatch({
            type: STEP_ADD_UNI_CONTENT,
            payload: {
                id,
                uniData: res.data
            }}))
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

