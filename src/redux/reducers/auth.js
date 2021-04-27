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
        
        case AUTH_SUCCESS:
        case LOGIN_SUCCESS:
            return {
                ...state,
                isAuthenticated: true,
                loading: false, 
                user: payload
            }
        
        case AUTH_ERROR:
        case LOGOUT_SUCCESS:
            return {
                ...state,
                user: null,
                isAuthenticated: false,
                loading: false,
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