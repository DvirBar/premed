import {
    UNI_LOADING,
    UNI_SUCCESS,
    UNI_ERROR,
    UNI_ADD,
    UNI_UPDATE,
    UNI_DELETE,
} from '../actions/types';

const initialState = {
    loading: false,
    unis: []
}

export default function(state = initialState, action) {
    const payload = action.payload;

    switch(action.type) {
        case UNI_LOADING:
            return {
                ...state,
                loading: true
            }

        case UNI_SUCCESS: 
            return {
                ...state,
                loading: false,
                unis: payload
            }

        case UNI_ERROR:
            return {
                ...state,
                loading: false,
            }

        case UNI_ADD:
            return {
                ...state,
                loading: false,
                unis: [...state.unis, payload]
            }

        case UNI_UPDATE:
            return {
                ...state,
                loading: false,
                unis: state.unis.map(uni => uni._id === payload._id ? uni = payload : uni)
            }

        case UNI_DELETE:
            return {
                ...state,
                loading: false,
                unis: state.unis.filter(uni => uni._id !== payload)
            }

        default:
            return state;
    }
}