import {
    PAGE_LOADING,
    PAGE_SUCCESS,
    PAGE_ERROR,
    PAGE_ADD,
    PAGE_UPDATE,
    PAGE_DELETE,
    PAGE_LINK_ADD,
    PAGE_LINK_UPDATE,
    PAGE_LINK_DELETE
} from '../actions/types';

const initialState = {
    loading: false,
    pages: []
}

export default function(state = initialState, action) {
    const payload = action.payload;

    switch(action.type) {
        case PAGE_LOADING:
            return {
                ...state,
                loading: true
            }

        case PAGE_SUCCESS: 
            return {
                ...state,
                loading: false,
                pages: payload
            }

        case PAGE_ERROR:
            return {
                ...state,
                loading: false,
            }

        case PAGE_ADD:
            return {
                ...state,
                loading: false,
                pages: [...state.pages, payload]
            }

        case PAGE_UPDATE:
        case PAGE_LINK_ADD:
        case PAGE_LINK_UPDATE:
        case PAGE_LINK_DELETE:
            return {
                ...state,
                loading: false,
                pages: state.pages.map(page => page._id === payload._id ? page = payload : page)
            }

        case PAGE_DELETE:
            return {
                ...state,
                loading: false,
                pages: state.pages.filter(page => page._id !== payload)
            }

        default:
            return state;
    }
}