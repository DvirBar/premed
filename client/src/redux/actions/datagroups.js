import {
    DATA_GROUP_LOADING,
    DATA_GROUP_SUCCESS,
    DATA_GROUP_ERROR,
    DATA_GROUP_ADD,
    DATA_GROUP_UPDATE,
    DATA_GROUP_DELETE,
    DATA_GROUP_ASSIGN_ROLE
} from './types';
import axios from 'axios';
import { getMessage, getError } from './messages';

// Basic types
export const dataGroupLoad = () => {
    return {
        type: DATA_GROUP_LOADING
    }
}

export const dataGroupSuccess = dataGroup => {
    return {
        type: DATA_GROUP_SUCCESS,
        payload: dataGroup
    }
}

export const dataGroupError = () => {
    return {
        type: DATA_GROUP_ERROR
    }
}

export const dataGroupAdd = dataGroup => {
    return {
        type: DATA_GROUP_ADD,
        payload: dataGroup
    }
}

export const dataGroupUpdate = dataGroup => {
    return {
        type: DATA_GROUP_UPDATE,
        payload: dataGroup
    }
}

export const dataGroupDelete = id => {
    return {
        type: DATA_GROUP_DELETE,
        payload: id
    }
}

// Get data groups by paths
export const getGroupsByPaths = data => dispatch => {
    dispatch(dataGroupLoad());

    // Requrest body
    const body = JSON.stringify(data);

    axios.get(`/api/datagroups/${body}`)
         .then(res => dispatch({
             type: DATA_GROUP_SUCCESS,
             payload: res.data
         }))
         .catch(err => {
             dispatch(dataGroupError())
             dispatch(getMessage(err))
         })
}

// Get all data groups
export const getDataGroups = () => dispatch => {
    dispatch(dataGroupLoad());

    axios.get('api/datagroups')
         .then(res => dispatch(dataGroupSuccess(res.data)))
         .catch(err => {
             dispatch(dataGroupError());
             dispatch(getError(err));
         });
}

// Create new path
export const addDataGroup = data => dispatch => {
    dispatch(dataGroupLoad());

    // Request body
    const body = JSON.stringify(data);

    axios.post('api/datagroups', body)
         .then(res => dispatch(dataGroupAdd(res.data)))
         .catch(err => dispatch(getError(err)))
}

export const editDataGroup = (id, data) => dispatch => {
    dispatch(dataGroupLoad());
    
    // Request body
    const body = JSON.stringify(data);

    axios.put(`api/datagroups/${id}`, body)
         .then(res => dispatch(dataGroupUpdate(res.data)))
         .catch(err => dispatch(getError(err)))
}

export const dataGroupAssignRole = (id, data) => dispatch => {
    // Request body
    const body = JSON.stringify(data)

    axios.put(`api/datagroups/${id}/assignRole`, body)
         .then(res => dispatch({
             type: DATA_GROUP_ASSIGN_ROLE,
             payload: res.data
         }))
         .catch(err => {
             dispatch(dataGroupError())
             dispatch(getMessage(err))
         })
}

export const deleteDataGroup = id => dispatch => {
    dispatch(dataGroupLoad());

    axios.delete(`api/datagroups/${id}`)
         .then(res => {
             dispatch(dataGroupDelete(id));
             dispatch(getMessage(res.data));
         })
         .catch(err => {
            dispatch(dataGroupError())
            dispatch(getError(err))
         })
}

