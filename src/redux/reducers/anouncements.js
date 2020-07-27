import {
    ANC_LOADING,
    ANC_SUCCESS,
    ANC_ERROR,
    ANC_ADD,
    ANC_UPDATE,
    ANC_DELETE
} from '../actions/types';

const initialState = {
    loading: false,
    ancs: []
}

export default function(state = initialState, action) {
    const payload = action.payload;

    switch(action.type) {
        case ANC_LOADING:
            return {
                ...state,
                loading: true
            }
        
        case ANC_SUCCESS:
            return {
                ...state,
                loading: false, 
                ancs: payload
            }
        
        case ANC_ERROR:
            return {
                ...state,
                loading: false,
            }

        case ANC_ADD:
            return {
                ...state,
                loading: false,
                ancs: [...state.ancs, payload]
            }

        case ANC_UPDATE:
            return {
                ...state,
                loading: false,
                ancs: state.ancs.map(anc => anc._id === payload._id ? anc = payload : anc )
            }

        case ANC_DELETE:
            return {
                ...state,
                loading: false,
                ancs: state.ancs.filter(anc => anc._id !== payload)
            }

        default: 
            return state
    }
}