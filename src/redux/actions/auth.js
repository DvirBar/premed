import {
    AUTH_LOADING,
    AUTH_SUCCESS,
    AUTH_ERROR,
    LOGIN_LOADING,
    LOGIN_SUCCESS,
    LOGOUT_SUCCESS,
    USER_UPDATE,
    USER_ERROR
} from './types';
import { getError, getMessage } from './messages';
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

const userError = () => {
    return {
        type: USER_ERROR
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
            dispatch(getError(err));
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
            dispatch(getError(err));
        })
}

// TODO: write edit action
export const editUser = data => dispatch => {
    // TODO: Add soft load

    // Request body
    const body = JSON.stringify(data);

    axios.put('/api/auth/user', body)
         .then(res => dispatch({
             type: USER_UPDATE,
             payload: res.data
         }))
         .catch(err => {
             dispatch(userError())
             dispatch(getMessage(err))
         })
}