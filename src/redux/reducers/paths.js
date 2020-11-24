import {
    PATH_LOADING,
    BASE_DATA_SUCCESS
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

        case BASE_DATA_SUCCESS: 
            return {
                ...state,
                loading: false,
                paths: payload.paths
            }

        default:
            return state;
    }
}