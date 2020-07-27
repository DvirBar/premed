import {
    GROUP_LOADING,
    GROUP_SUCCESS,
    GROUP_ERROR,
    USER_SUBSCRIBES,
    GROUP_ADD,
    GROUP_UPDATE,
    GROUP_SUBSCRIBE,
    GROUP_UNSUBSCRIBE,
    GROUP_DELETE,
} from './types';
import axios from 'axios';
import { getMessage, getError } from './messages';


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

export const userSubs = subs => {
    return {
        type: USER_SUBSCRIBES,
        payload: subs
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

export const groupSubscribe = groupId => {
    return {
        type: GROUP_SUBSCRIBE,
        payload: groupId
    }
}

export const groupUnsubscribe = groupId => {
    return {
        type: GROUP_UNSUBSCRIBE,
        payload: groupId
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
        .get('/api/ancgroups')
        .then(res => dispatch(groupSuccess(res.data)))
        .catch(err => {
            dispatch(groupError())
            dispatch(getError(err))
        })
}

// Get all user subscriptions
export const getSubs = () => dispatch => {
    dispatch(groupLoad());

    axios
        .get('/api/ancgroups/subscribes')
        .then(res => dispatch(getSubs(res.data)))
        .catch(err => dispatch(getError(err)))
}

// Add new group
export const addGroup = data => dispatch => {
    dispatch(groupLoad());

    // Reuest body 
    const body = JSON.stringify(data);

    // Send request
    axios
        .post('/api/ancgroups', body)
        .then(res => dispatch(groupAdd(res.data)))
        .catch(err =>  dispatch(getError(err)))
}

// Edit group
export const editGroup = (id, data) => dispatch => {
    dispatch(groupLoad());

    // Request body
    const body = JSON.stringify(data)

    axios
        .put(`/api/ancgroups/${id}`, body)
        .then(res => dispatch(groupUpdate(res.data)))
        .catch(err => dispatch(getError(err)))
}

// Subscribe to a group
export const subscribeGroup = id => dispatch => {
    dispatch(groupLoad());

    axios 
        .put(`/api/ancgroups/${id}/subscribe`)
        .then(res => {
            dispatch(groupSubscribe(id));
            dispatch(getMessage(res.data));
        })
        .catch(err => dispatch(getError(err)))
}

// Unsubscribe from a group
export const unsubscribeGroup = id => dispatch => {
    dispatch(groupLoad());

    axios 
        .put(`/api/ancgroups/${id}/unsubscribe`)
        .then(res => {
            dispatch(groupUnsubscribe(id));
            dispatch(getMessage(res.data));
        })
        .catch(err => dispatch(getError(err)))
}


// Add path to group
export const addGroupPath = (data, id) => dispatch => {
    dispatch(groupLoad());

    // Request body
    const body = JSON.stringify(data)

    axios
        .put(`/api/ancgroups/${id}/addpath`, body)
        .then(res => dispatch(groupUpdate(res.data)))
        .catch(err => dispatch(getError(err)))
}

// Delete group
export const deleteGroup = id => dispatch => {
    dispatch(groupLoad());

    axios
        .delete(`/api/ancgroups/${id}`)
        .then(res => {
            dispatch(groupDelete(id))
            dispatch(getMessage(res))
        })
        .catch(err => dispatch(getError(err)))
}