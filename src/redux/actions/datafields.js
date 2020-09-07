import {
    DATA_FIELD_LOADING,
    DATA_FIELD_SUCCESS,
    DATA_FIELD_ERROR,
    ALLOWED_TYPES_GET,
    DATA_FIELD_ADD,
    DATA_FIELD_UPDATE,
    DATA_FIELD_DELETE,
    DATA_FIELD_VALID_ADD,
    DATA_FIELD_VALID_UPDATE,
    DATA_FIELD_VALID_DELETE
} from '../actions/types';
import axios from 'axios';
import { getMessage, getError } from './messages';

// Basic types
export const dataFieldLoad = () => {
    return {
        type: DATA_FIELD_LOADING
    }
}

export const dataFieldSuccess = datafields => {
    return {
        type: DATA_FIELD_SUCCESS,
        payload: datafields
    }
}

export const dataFieldError = () => {
    return {
        type: DATA_FIELD_ERROR
    }
}

export const allowedTypesGet = types => {
    return {
        type: ALLOWED_TYPES_GET,
        payload: types
    }
}

export const dataFieldAdd = field => {
    return {
        type: DATA_FIELD_ADD,
        payload: field
    }
}

export const dataFieldUpdate = field => {
    return {
        type: DATA_FIELD_UPDATE,
        payload: field
    }
}

export const dataFieldDelete = id => {
    return {
        type: DATA_FIELD_DELETE,
        payload: id
    }
}

export const validAdd = field => {
    return {
        type: DATA_FIELD_VALID_ADD,
        payload: field
    }
}

export const validUpdate = field => {
    return {
        type: DATA_FIELD_VALID_UPDATE,
        payload: field
    }
}


export const validDelete = field => {
    return {
        type: DATA_FIELD_VALID_DELETE,
        payload: field
    }
}

// Get all data fields
export const getDataFields = () => dispatch => {
    dispatch(dataFieldLoad());

    axios.get('api/datafields')
         .then(res => dispatch(dataFieldSuccess(res.data)))
         .catch(err => {
             dispatch(dataFieldError());
             dispatch(getError(err));
         });
}

export const getAllowedTypes = () => dispatch => {
    dispatch(dataFieldLoad);

    axios.get('api/datafields/allowedTypes')
         .then(res => dispatch(allowedTypesGet(res.data)))
         .catch(() => {
             dispatch(dataFieldError());
         })
}

// Create new data field
export const addDataField = data => dispatch => {
    // Request body
    const body = JSON.stringify(data);

    axios.post('api/datafields', body)
         .then(res => dispatch(dataFieldAdd(res.data)))
         .catch(err => dispatch(getError(err)))
}

export const editDataField = (id, data) => dispatch => {
    // Request body
    const body = JSON.stringify(data);

    console.log(data);

    axios.put(`api/datafields/${id}`, body)
         .then(res => dispatch(dataFieldUpdate(res.data)))
         .catch(err => dispatch(getError(err)))
}

export const deleteDataField = id => dispatch => {

    axios.delete(`api/datafields/${id}`)
         .then(res => {
             dispatch(dataFieldDelete(id));
             dispatch(getMessage(res.data));
         })
         .catch(err => dispatch(getError(err)))
}

// Add validator
export const addValid = (fieldId, data) => dispatch => {
    // Request body
    const body = JSON.stringify(data);

    axios.put(`api/datafields/${fieldId}/addValid`, body)
         .then(res => dispatch(validAdd(res.data)))
         .catch(err => dispatch(getError(err)))
}

// Update validator
export const editValid = (fieldId, validId, data) => dispatch => {
    // Request body
    const body = JSON.stringify(data);

    axios.put(`api/datafields/${fieldId}/${validId}`, body)
         .then(res => dispatch(validUpdate(res.data)))
         .catch(err => dispatch(getError(err)))
}

// Remove validator
export const deleteValid = (fieldId, validId) => dispatch => {

    axios.put(`api/datafields/${fieldId}/${validId}/remove`)
         .then(res => dispatch(validDelete(res.data)))
         .catch(err => dispatch(getError(err)))
}


