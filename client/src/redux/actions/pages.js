import {
    PAGE_LOADING,
    PAGE_SUCCESS,
    PAGE_ERROR,
    PAGE_ADD,
    PAGE_UPDATE,
    PAGE_DELETE,
    PAGE_LINK_ADD,
    PAGE_LINK_UPDATE,
    PAGE_LINK_DELETE
} from './types';
import axios from 'axios';
import { getMessage, getError } from './messages';

// Basic types
export const pageLoad = () => {
    return {
        type: PAGE_LOADING
    }
}

export const pageError = () => {
    return {
        type: PAGE_ERROR
    }
}

// Get all pages
export const getPages = () => dispatch => {
    dispatch(pageLoad());

    axios.get('api/pages')
         .then(res => dispatch({
             type: PAGE_SUCCESS,
             payload: res.data
         }))
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
         .then(res => dispatch({
             type: PAGE_ADD,
             payload: res.data
         }))
         .catch(err => dispatch(getError(err)))
}

export const editPage = (id, data) => dispatch => {
    dispatch(pageLoad());
    
    // Request body
    const body = JSON.stringify(data);

    axios.put(`api/pages/${id}`, body)
         .then(res => dispatch({
             type: PAGE_UPDATE,
             payload: res.data
         }))
         .catch(err => dispatch(getError(err)))
}

export const deletePage = id => dispatch => {
    dispatch(pageLoad());

    axios.delete(`api/pages/${id}`)
         .then(res => {
             dispatch({
                 type: PAGE_DELETE,
                 payload: id
             });
             dispatch(getMessage(res.data));
         })
         .catch(err => {
            dispatch(pageError())
            dispatch(getError(err))
         })
}

// Links
export const addPageLink = (pageId, data) => dispatch => {
    // Request body
    const body = JSON.stringify(data);

    axios.put(`api/pages/${pageId}/addLink`, body)
         .then(res => dispatch({
             type: PAGE_LINK_ADD,
             payload: res.data
         }))
         .catch(err => dispatch(getError(err)))
}

export const editSubpageLink = (pageId, linkId, data) => dispatch => {
    // Request body
    const body = JSON.stringify(data);

    axios.put(`api/pages/${pageId}/${linkId}`, body)
         .then(res => dispatch({
             type: PAGE_LINK_UPDATE,
             payload: res.data
         }))
         .catch(err => dispatch(getError(err)))
}

export const deleteSubpageLink = (pageId, linkId) => dispatch => {

    axios.put(`api/pages/${pageId}/${linkId}/remove`)
         .then(res => dispatch({
             type: PAGE_LINK_DELETE,
             payload: res.data
         }))
         .catch(err => dispatch(getError(err)))
}