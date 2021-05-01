import {
    GET_USER_LOADING,
    GET_USER_SUCCESS,
    GET_USER_FAILURE,
    LOGIN_LOADING,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    REGISTER_LOADING, 
    REGISTER_SUCCESS,
    REGISTER_FAILURE,
    EDIT_USER_LOADING,
    EDIT_USER_SUCCESS,
    EDIT_USER_FAILURE,
    LOGOUT
} from '../auth/types';
import { getError, getMessage } from './messages';
import axios from 'axios';
import {  setLoader } from '../loader/utils'

export const logout = () => dispatch => {
    axios.post('/api/auth/logout')
        .then(() => dispatch({
            type: LOGOUT
        }))
}

// Get user
export const getUser = () => dispatch => {
    dispatch(setLoader(GET_USER_LOADING))

    axios
        .get('/api/auth/user')
        .then(res => dispatch({
            type: GET_USER_SUCCESS,
            payload: res.data
        }))
        .catch(err => {
            dispatch({
                type: GET_USER_FAILURE
            });
        })
}


// Login
export const login = data => dispatch => {
    dispatch(setLoader(LOGIN_LOADING))

    // Request body 
    const body = JSON.stringify(data);
    
    // Send request
    axios
        .post('/api/auth/login', body)
        .then(res => dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        }))
        .catch(err => {
            dispatch({
                type: LOGIN_FAILURE
            });
            dispatch(getError(err));
        })

}

// Register
export const register = data => dispatch => {
    dispatch(setLoader(REGISTER_LOADING))
    
    // Request body
    const body = JSON.stringify(data)

    axios
        .post('/api/auth/register', body)
        .then(res => dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        }))
        .catch(err => {
            dispatch({
                type: REGISTER_FAILURE
            })
            dispatch(getError(err));
        })
}

export const editUser = data => dispatch => {
    dispatch(setLoader(EDIT_USER_LOADING))

    // Request body
    const body = JSON.stringify(data);

    axios.put('/api/auth/user', body)
         .then(res => dispatch({
             type: EDIT_USER_SUCCESS,
             payload: res.data
         }))
         .catch(err => {
             dispatch({
                 type: EDIT_USER_FAILURE
             })
             dispatch(getMessage(err))
         })
}