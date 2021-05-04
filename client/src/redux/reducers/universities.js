import {
    UNI_LOADING,
    BASE_DATA_SUCCESS
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

        case BASE_DATA_SUCCESS:
            return {
                ...state,
                loading: false,
                unis: payload.universities
            }

        default:
            return state;
    }
}