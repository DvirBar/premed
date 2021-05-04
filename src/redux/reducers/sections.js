import {
    SEC_LOADING,
    SEC_SUCCESS,
    SEC_ERROR,
    SEC_ADD,
    SEC_UPDATE,
    SEC_DELETE,
    ITEM_ADD,
    ITEM_UPDATE,
    ITEM_DELETE
} from '../actions/types';

const initialState = {
    loading: false,
    sections:[]
}

export default function(state = initialState, action) {
    const payload = action.payload

    switch(action.type) {
        case SEC_LOADING:
            return {
                ...state,
                loading: true
            }

        case SEC_SUCCESS:
            return {
                ...state,
                loading: false,
                sections: payload
            }

        case SEC_ERROR: 
            return {
                ...state,
                loading: false,
                sections: []
            }

        case SEC_ADD:
            return {
                ...state,
                sections: [...state.sections, payload]
            }

        case SEC_UPDATE:
        case ITEM_ADD:
        case ITEM_UPDATE:
        case ITEM_DELETE:
            return {
                ...state,
                loading: false,
                sections: state.sections.map(section => 
                    section.id === payload.id ? section = payload : section)
            }

        case SEC_DELETE: 
            return {
                ...state,
                loading: false,
                sections: state.sections.filter(section => section.id !== payload)
            }

        default: 
            return state;
    }
}