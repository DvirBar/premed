import {
    DATA_FIELD_LOADING,
    DATA_FIELD_SUCCESS,
    DATA_FIELD_ERROR,
    ALLOWED_TYPES_GET,
    DATA_FIELD_ADD,
    DATA_FIELD_UPDATE,
    DATA_FIELD_DELETE,
    DATA_FIELD_VALID_ADD,
    DATA_FIELD_VALID_UPDATE,
    DATA_FIELD_VALID_DELETE,
    DATA_FIELD_OPTION_ADD,
    DATA_FIELD_OPTION_DELETE,
    DATA_FIELD_ASSIGN_ROLE
} from '../actions/types';

const initialState = {
    loading: false,
    fields: [],
    types: {}
}

export default function(state = initialState, action) {
    const payload = action.payload

    switch(action.type) {
        case DATA_FIELD_LOADING:
            return {
                ...state,
                loading: true
            }

        case DATA_FIELD_SUCCESS:
            return {
                ...state,
                loading: false,
                fields: payload
            }

        case DATA_FIELD_ERROR: 
            return {
                ...state,
                loading: false,
                fields: []
            }

        case ALLOWED_TYPES_GET:
            return {
                ...state,
                loading: false,
                types: payload
            }

        case DATA_FIELD_ADD:
            return {
                ...state,
                fields: [...state.fields, payload]
            }

        case DATA_FIELD_UPDATE:
        case DATA_FIELD_VALID_ADD:
        case DATA_FIELD_VALID_UPDATE:
        case DATA_FIELD_VALID_DELETE:
        case DATA_FIELD_OPTION_ADD:
        case DATA_FIELD_OPTION_DELETE:
            return {
                ...state,
                loading: false,
                fields: state.fields.map(field => 
                    field._id === payload._id ? field = payload : field)
            }

        case DATA_FIELD_ASSIGN_ROLE:
            console.log(payload);
            return {
                ...state,
                loading: false,
                fields: state.fields.map(field => { 
                    let tempField = payload.find(curField => 
                        curField._id === field._id)
                    
                    return tempField ? field = tempField : field
                })
            }

        case DATA_FIELD_DELETE: 
            return {
                ...state,
                loading: false,
                fields: state.fields.filter(field => field._id !== payload)
            }

        default: 
            return state;
    }
}

export const getGroupFields = fields => {
    return fields.filter(field => 
        field.group)
}
