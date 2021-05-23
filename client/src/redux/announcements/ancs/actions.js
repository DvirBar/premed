import {
    ANC_LOADING,
    ANC_SUCCESS,
    ANC_ERROR,
    ANC_ADD,
    ANC_UPDATE,
    ANC_DELETE
} from './types';
import axios from 'axios';
import { getError } from '../../actions/messages';


// Basic types
export const ancLoad = () => {
    return {
        type: ANC_LOADING
    }
}

export const ancSuccess = ancs => {
    return {
        type: ANC_SUCCESS,
        payload: ancs
    }
}

export const ancError = () => {
    return {
        type: ANC_ERROR
    }
}

export const ancAdd = anc => {
    return {
        type: ANC_ADD,
        payload: anc
    }
}

export const ancUpdate = anc => {
    return {
        type: ANC_UPDATE,
        payload: anc
    }
}

export const ancDelete = id => {
    return {
        type: ANC_DELETE,
        payload: id
    }
}

// Get anouncement
export const getAncs = () => dispatch => {
    dispatch(ancLoad());

    axios
        .get('/api/announcements')
        .then(res => dispatch(ancSuccess(res.data)))
        .catch(err => {
            // Get message
            dispatch(ancError());
        })
}

// Get anouncement
export const getAncsList = data => dispatch => {
    dispatch(ancLoad());
    const body = JSON.stringify(data)

    axios
        .post('/api/announcements/ancsList', body)
        .then(res => dispatch({
            type: ANC_SUCCESS,
            payload: res.data
        }))
        .catch(err => {
            // Get message
            dispatch(ancError());
        })
}


// Add new anouncement
export const addAnc = data => dispatch => {
    dispatch(ancLoad());

    // Reuest body 
    const body = JSON.stringify(data);

    // Send request
    axios
        .post('/api/announcements', body)
        .then(res => dispatch(ancAdd(res.data)))
        .catch(err => {
            dispatch(ancError());
            dispatch(getError(err))
        })
}

// Edit anouncement
export const editAnc = (id, data) => dispatch => {
    dispatch(ancLoad());

    // Request body
    const body = JSON.stringify(data)

    axios
        .put(`/api/announcements/${id}`, body)
        .then(res => dispatch(ancUpdate(res.data)))
        .catch(err => {
            // Get message
            getError(err)
        })
}

// Delete anouncement
export const deleteAnc = id => dispatch => {
    dispatch(ancLoad());

    axios
        .delete(`/api/announcements/${id}`)
        .then(res =>
            // Get message 
            dispatch(ancDelete(id)))
        .catch(err => {
            // Get message
            getError(err)
        })
}