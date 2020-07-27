import {
    PATH_LOADING,
    PATH_SUCCESS,
    PATH_ERROR,
    PATH_ADD,
    PATH_UPDATE,
    PATH_DELETE,
} from '../actions/types';

const initialState = {
    loading: false,
    paths: []
}

export default function(state = initialState, action) {
    const payload = action.payload;

    switch(action.type) {
        case PATH_LOADING:
            return {
                ...state,
                loading: true
            }

        case PATH_SUCCESS: 
            return {
                ...state,
                loading: false,
                paths: payload
            }

        case PATH_ERROR:
            return {
                ...state,
                loading: false,
            }

        case PATH_ADD:
            return {
                ...state,
                loading: false,
                paths: [...state.paths, payload]
            }

        case PATH_UPDATE:
            console.log(".\n.\n.\n.\n.\n.\n.\n.\n.\n.\n.\n.\n.\n.\n.\n.\n.\n.\n.\n.\n.\n" + 
            payload._id)
            return {
                ...state,
                loading: false,
                paths: state.paths.map(path => path._id === payload._id ? path = payload : path)
            }

        case PATH_DELETE:
            return {
                ...state,
                loading: false,
                paths: state.paths.filter(path => path._id !== payload)
            }

        default:
            return state;
    }
}