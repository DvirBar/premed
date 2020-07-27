import {
    PATH_LOADING,
    PATH_SUCCESS,
    PATH_ERROR,
    PATH_ADD,
    PATH_UPDATE,
    PATH_DELETE,
} from './types';
import axios from 'axios';
import { getMessage, getError } from './messages';

// Basic types
export const pathLoad = () => {
    return {
        type: PATH_LOADING
    }
}

export const pathSuccess = paths => {
    return {
        type: PATH_SUCCESS,
        payload: paths
    }
}

export const pathError = () => {
    return {
        type: PATH_ERROR
    }
}

export const pathAdd = path => {
    return {
        type: PATH_ADD,
        payload: path
    }
}

export const pathUpdate = path => {
    return {
        type: PATH_UPDATE,
        payload: path
    }
}

export const pathDelete = id => {
    return {
        type: PATH_DELETE,
        payload: id
    }
}

// Get all paths
export const getPaths = () => dispatch => {
    dispatch(pathLoad());

    axios.get('api/paths')
         .then(res => dispatch(pathSuccess(res.data)))
         .catch(err => {
             dispatch(pathError());
             dispatch(getError(err));
         });
}

// Create new path
export const addPath = data => dispatch => {
    dispatch(pathLoad());

    // Request body
    const body = JSON.stringify(data);

    axios.post('api/paths', body)
         .then(res => dispatch(pathAdd(res.data)))
         .catch(err => dispatch(getError(err)))
}

export const editPath = (id, data) => dispatch => {
    dispatch(pathLoad());
    
    // Request body
    const body = JSON.stringify(data);

    axios.put(`api/paths/${id}`, body)
         .then(res => dispatch(pathUpdate(res.data)))
         .catch(err => dispatch(getError(err)))
}

export const deletePath = id => dispatch => {
    dispatch(pathLoad());

    axios.delete(`api/paths/${id}`)
         .then(res => {
             dispatch(pathDelete(id));
             dispatch(getMessage(res.data));
         })
         .catch(err => {
            dispatch(pathError())
            dispatch(getError(err))
         })
}

