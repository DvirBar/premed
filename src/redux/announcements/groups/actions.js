import {
    GROUP_LOADING,
    GROUP_SUCCESS,
    GROUP_ERROR,
    GET_GROUPS_USER_SUBSCRIBES,
    GROUP_ADD,
    GROUP_UPDATE,
    GROUP_TOGGLE_SUBSCRIBE,
    GROUP_DELETE,
} from './types';
import axios from 'axios';
import { getMessage, getError } from '../../actions/messages';

const apiUrl = '/api/announcements/groups'

// Basic types
export const groupLoad = () => {
    return {
        type: GROUP_LOADING
    }
}

export const groupSuccess = groups => {
    return {
        type: GROUP_SUCCESS,
        payload: groups
    }
}

export const groupError = () => {
    return {
        type: GROUP_ERROR
    }
}

export const groupAdd = group => {
    return {
        type: GROUP_ADD,
        payload: group
    }
}

export const groupUpdate = group => {
    return {
        type: GROUP_UPDATE,
        payload: group
    }
}

export const groupDelete = id => {
    return {
        type: GROUP_DELETE,
        payload: id
    }
}

// Get groups
export const getGroups = () => dispatch => {
    dispatch(groupLoad());

    axios
        .get(apiUrl)
        .then(res => dispatch(groupSuccess(res.data)))
        .catch(err => {
            dispatch(groupError())
            dispatch(getError(err))
        })
}

// Get all user subscriptions
export const getUserSubs = () => dispatch => {
    dispatch(groupLoad());

    axios
        .get(`${apiUrl}/subs`)
        .then(res => ({
            type: GET_GROUPS_USER_SUBSCRIBES,
            payload: res.data
        }))
        .catch(err => dispatch(getError(err)))
}

// Add new group
export const addGroup = data => dispatch => {
    // Reuest body 
    const body = JSON.stringify(data);

    // Send request
    axios
        .post(apiUrl, body)
        .then(res => dispatch(groupAdd(res.data)))
        .catch(err =>  dispatch(getError(err)))
}

// Edit group
export const editGroup = (id, data) => dispatch => {
    // Request body
    const body = JSON.stringify(data)

    axios
        .put(`${apiUrl}/${id}`, body)
        .then(res => dispatch(groupUpdate(res.data)))
        .catch(err => dispatch(getError(err)))
}

// Unsubscribe from a group
export const groupToggleSubscribe = id => dispatch => {
    axios 
        .put(`${apiUrl}/toggleSubscribe`)
        .then(res => {
            dispatch({
                type: GROUP_TOGGLE_SUBSCRIBE,
                payload: res.data.subs
            });
            dispatch(getMessage(res.data.message));
        })
        .catch(err => dispatch(getError(err)))
}


// Delete group
export const deleteGroup = id => dispatch => {
    axios
        .delete(`${apiUrl}/${id}`)
        .then(res => {
            dispatch(groupDelete(id))
            dispatch(getMessage(res))
        })
        .catch(err => dispatch(getError(err)))
}