import {
    STATS_INPUTS_LOADING,
    STATS_INPUTS_SUCCESS
} from '../actions/types';

const initialState = {
    loading: false,
    fields: [],
    groups: [],
    calcs: []
}

export default function(state = initialState, action) {
    const payload = action.payload;

    switch(action.type) {
        case STATS_INPUTS_LOADING:
            return {
                ...state,
                loading: true
            }

        case STATS_INPUTS_SUCCESS: 
            return {
                ...state,
                loading: false,
                ...payload
            }

        default:
            return state;
    }
}