import {
    GET_USERS_SUCCESS,
    GET_USERS_LOAD_MORE_SUCCESS,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    REGISTER_SUCCESS,
    REGISTER_FAILURE,
    EDIT_USER_SUCCESS,
    LOGOUT,
    GET_USER_SUCCESS
} from '../auth/types';

const initialState = {
    isAuthenticated: false,
    user: null,
    users: {
        users: [],
        count: 0
    }
    
}

export default function(state = initialState, action) {
    const payload = action.payload

    switch(action.type) {
        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
        case GET_USER_SUCCESS:
            return {
                ...state,
                isAuthenticated: true,
                user: payload
            }

        case GET_USERS_SUCCESS:
            return {
                ...state,
                users: {
                    ...state.users,
                    ...payload
                }  
            }

        case GET_USERS_LOAD_MORE_SUCCESS:
            return {
                ...state,
                users: {
                    ...state.users,
                    ...payload,
                    users:  [...state.users.users, ...payload.users]
                }
            }
        
        case LOGIN_FAILURE:
        case REGISTER_FAILURE:
        case LOGOUT:
            return {
                ...state,
                user: null,
                isAuthenticated: false,
            }
        
        case EDIT_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                user: payload
            }

        default: 
            return state
    }
}