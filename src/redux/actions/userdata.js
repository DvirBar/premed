import {
    USER_DATA_LOADING,
    USER_DATA_SUCCESS,
    USER_DATA_ERROR,
    USER_DATA_ADD,
    USER_DATA_UPDATE_PATHS,
    USER_DATA_INSERT,
    USER_DATA_TOGGLE_ENABLED,
    USER_DATA_DELETE,
} from './types';
import axios from 'axios';
import { getMessage, getError } from './messages';

// Basic types
export const dataLoad = () => {
    return {
        type: USER_DATA_LOADING
    }
}

export const dataError = () => {
    return {
        type: USER_DATA_ERROR
    }
}

// Get one user data
export const getOneUserData = () => dispatch => {
    dispatch(dataLoad());

    axios.get('api/userdata/user')
         .then(res => { 
             dispatch({
                type: USER_DATA_SUCCESS,
                payload: res.data
            })})
         .catch(err => {
             dispatch(dataError());
         });
}

// Get all users data by path
export const getUsersData = pathId => dispatch => {
    dispatch(dataLoad());

    axios.get(`api/userdata/user/${pathId}`)
         .then(res => { 
             dispatch({
                type: USER_DATA_SUCCESS,
                payload: res.data
            })})
         .catch(err => {
             dispatch(dataError());
             dispatch(getError(err));
         });
}

// Create new user data collection
export const addUserData = data => dispatch => {
    // Request body
    const body = JSON.stringify(data);

    axios.post('api/userdata', body)
         .then(res => {
             dispatch ({
                type: USER_DATA_ADD,
                payload: res.data
             })})
         .catch(err => {
             dispatch(dataError())
             dispatch(getError(err))
            })
}

// Edit user paths
export const editUserDataPaths = data => dispatch => {
    dispatch(dataLoad());

    // Request body
    const body = JSON.stringify(data);

    axios.put('api/userdata/editpaths', body)
         .then(res => 
            dispatch({
                type: USER_DATA_UPDATE_PATHS,
                payload: res.data
             }))
         .catch(err => {
             dispatch(dataError())
             dispatch(getError(err))
            })
}

// Insert new data to user data collection
export const insertData = data => dispatch => {
    dispatch(dataLoad());

    // Request body
    const body = JSON.stringify(data);

    axios.put('api/userdata/insertdata', body)
         .then(res => 
            dispatch({
                type: USER_DATA_INSERT,
                payload: res.data
             }))
         .catch(err => {
             dispatch(dataError())
             dispatch(getError(err))
            })
}

// Toggle user data enabled status
export const toggleEnabled = () => dispatch => {
    dispatch(dataLoad());

    axios.put('api/userdata/toggleEnabled')
         .then(res => 
            dispatch({
                type: USER_DATA_TOGGLE_ENABLED,
                payload: res.data
             }))
         .catch(err => {
             dispatch(dataError())
             dispatch(getError(err))
            })
}


export const deleteUserData = userId => dispatch => {
    dispatch(dataLoad());

    axios.delete(`api/userdata/${userId}`)
         .then(res => {
             dispatch({
                type: USER_DATA_DELETE,
                payload: userId
             })
             dispatch(getMessage(res.data))
         })
         .catch(err => {
            dispatch(dataError())
            dispatch(getError(err))
         })
}


