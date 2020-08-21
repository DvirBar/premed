import {
    PAGE_LOADING,
    PAGE_SUCCESS,
    PAGE_ERROR,
    PAGE_ADD,
    PAGE_UPDATE,
    PAGE_DELETE,
    SUBPAGE_ADD,
    SUBPAGE_UPDATE,
    SUBPAGE_DELETE
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

export const subpageAdd = subpage => {
    return {
        type: SUBPAGE_ADD,
        payload: subpage
    }
}

export const subpageUpdate = subpage => {
    return {
        type: SUBPAGE_UPDATE,
        payload: subpage
    }
}
export const subpageDelete = subpage => {
    return {
        type: SUBPAGE_DELETE,
        payload: subpage
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


// Subpages
export const addSubpage = (pageId, data) => dispatch => {
    // Request body
    const body = JSON.stringify(data);

    axios.put(`api/pages/${pageId}/subpage`, body)
         .then(res => dispatch(subpageAdd(res.data)))
         .catch(err => dispatch(getError(err)))
}

export const editSubpage = (pageId, subpageId, data) => dispatch => {
    // Request body
    const body = JSON.stringify(data);

    axios.put(`api/pages/${pageId}/${subpageId}`, body)
         .then(res => dispatch(subpageUpdate(res.data)))
         .catch(err => dispatch(getError(err)))
}

export const deleteSubpage = (pageId, subpageId) => dispatch => {

    axios.put(`api/pages/${pageId}/${subpageId}/remove`)
         .then(res => dispatch(subpageDelete(res.data)))
         .catch(err => dispatch(getError(err)))
}


