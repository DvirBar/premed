import {
    PAGE_LOADING,
    PAGE_SUCCESS,
    PAGE_ERROR,
    PAGE_ADD,
    PAGE_UPDATE,
    PAGE_DELETE,
} from './types';
import axios from 'axios';
import { getMessage, getError } from './messages';

// Basic types
export const pageLoad = () => {
    return {
        type: PAGE_LOADING
    }
}

export const pageSuccess = pages => {
    return {
        type: PAGE_SUCCESS,
        payload: pages
    }
}

export const pageError = () => {
    return {
        type: PAGE_ERROR
    }
}

export const pageAdd = page => {
    return {
        type: PAGE_ADD,
        payload: page
    }
}

export const pageUpdate = page => {
    return {
        type: PAGE_UPDATE,
        payload: page
    }
}

export const pageDelete = id => {
    return {
        type: PAGE_DELETE,
        payload: id
    }
}

// Get all pages
export const getPages = () => dispatch => {
    dispatch(pageLoad());

    axios.get('api/pages')
         .then(res => dispatch(pageSuccess(res.data)))
         .catch(err => {
             dispatch(pageError());
             dispatch(getError(err));
         });
}

// Create new page
export const addPage = data => dispatch => {
    dispatch(pageLoad());

    // Request body
    const body = JSON.stringify(data);

    axios.post('api/pages', body)
         .then(res => dispatch(pageAdd(res.data)))
         .catch(err => dispatch(getError(err)))
}

export const editPage = (id, data) => dispatch => {
    dispatch(pageLoad());
    
    // Request body
    const body = JSON.stringify(data);

    axios.put(`api/pages/${id}`, body)
         .then(res => dispatch(pageUpdate(res.data)))
         .catch(err => dispatch(getError(err)))
}

export const deletePage = id => dispatch => {
    dispatch(pageLoad());

    axios.delete(`api/pages/${id}`)
         .then(res => {
             dispatch(pageDelete(id));
             dispatch(getMessage(res.data));
         })
         .catch(err => {
            dispatch(pageError())
            dispatch(getError(err))
         })
}

