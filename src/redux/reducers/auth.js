import {
    AUTH_LOADING,
    AUTH_SUCCESS,
    AUTH_ERROR,
    LOGIN_LOADING,
    LOGIN_SUCCESS,
    LOGOUT_SUCCESS,
    USER_UPDATE, 
    USER_ERROR
} from '../actions/types';

const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: false,
    loading: true,
    user: null
}

export default function(state = initialState, action) {
    const payload = action.payload

    switch(action.type) {
        case LOGIN_LOADING:
        case AUTH_LOADING:
            return {
                ...state,
                loading: true
            }
        
        case LOGIN_SUCCESS:
            localStorage.setItem('token', action.payload.token);
            return {
                ...state,
                isAuthenticated: true,
                loading: false, 
                user: payload.user
            }
        
        case AUTH_SUCCESS:
            return {
                ...state,
                isAuthenticated: true,
                loading: false,
                user: payload
            }

        case AUTH_ERROR:
        case LOGOUT_SUCCESS:
            localStorage.removeItem('token')
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                loading: false,
                user: null
            }
        
        case USER_UPDATE:
            return {
                ...state,
                loading: false,
                user: payload
            }

        case USER_ERROR:
            return {
                ...state,
                loading: false
            }

        default: 
            return state
    }
}