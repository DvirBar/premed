import {
    AUTH_LOADING,
    AUTH_SUCCESS,
    AUTH_ERROR,
    LOGIN_LOADING,
    LOGIN_SUCCESS,
    LOGOUT_SUCCESS
} from './types';
import { getMessage } from './messages';
import axios from 'axios';


// Basic types
export const authLoad = () => {
    return {
        type: AUTH_LOADING
    }
}

export const authSuccess = res => {
    return {
        type: AUTH_SUCCESS,
        payload: res
    }
}

export const authError = () => {
    return {
        type: AUTH_ERROR
    }
}

export const loginLoad = () => {
    return {
        type: LOGIN_LOADING
    }
}

export const loginSuccess = res => {
    return {
        type: LOGIN_SUCCESS,
        payload: {
            token: res.token,
            user: res.user
        }
    }
}

export const logout = () => {
    return {
        type: LOGOUT_SUCCESS
    }
}

// Get user
export const getUser = () => dispatch => {
    dispatch(authLoad());

    axios
        .get('/api/auth/user')
        .then(res => dispatch(authSuccess(res.data)))
        .catch(err => {
            dispatch(authError());
        })
}


// Login
export const login = data => dispatch => {
    dispatch(loginLoad());

    // Reuest body 
    const body = JSON.stringify(data);

    // Send request
    axios
        .post('/api/auth/login', body)
        .then(res => dispatch(loginSuccess(res.data)))
        .catch(err => {
            dispatch(authError());
            dispatch(getMessage(err.response.data, err.response.status))
        })

}

// Register
export const register = data => dispatch => {
    dispatch(authLoad());

    // Request body
    const body = JSON.stringify(data)

    axios
        .post('/api/auth/register', body)
        .then(res => dispatch(loginSuccess(res.data)))
        .catch(err => {
            dispatch(authError())
            dispatch(getMessage(err.response.data, err.response.status));
        })
}