import {
    USER_DATA_LOADING,
    USER_DATA_LOAD_SOFT,
    USER_DATA_SUCCESS,
    USER_DATA_ERROR,
    USER_DATA_ADD,
    USER_DATA_UPDATE_PATHS,
    USER_DATA_INSERT,
    USER_DATA_TOGGLE_ENABLED,
    EXEC_CALC,
    USER_DATA_DELETE
} from '../actions/types';

const initialState = {
    loading: false,
    softLoading: false,
    data: {}
}

export default function(state = initialState, action) {
    const payload = action.payload;

    switch(action.type) {
        case USER_DATA_LOADING:
            return {
                ...state,
                loading: true
            }

        case USER_DATA_LOAD_SOFT:
            return {
                ...state,
                softLoading: true
            }

        case USER_DATA_SUCCESS: 
            return {
                ...state,
                loading: false,
                data: payload
            }

        case USER_DATA_ERROR:
            return {
                ...state,
                loading: false,
            }

        case USER_DATA_ADD:
            return {
                ...state,
                loading: false,
                data: payload
            }

        case USER_DATA_UPDATE_PATHS:
            return {
                ...state,
                loading: false,
                data: payload
            }

        case USER_DATA_TOGGLE_ENABLED:
            return {
                ...state,
                softLoading: false,
                data: {
                    ...state.data,
                    enabled: payload.enabled
                }
            }

        case USER_DATA_INSERT:
        case EXEC_CALC:
            return {
                ...state,
                softLoading: false,
                data: {
                    ...state.data,
                    values: state.data.dataVals.map(value => 
                        value.field._id === payload.field._id ? 
                        value = payload : value)
                }
            }


        case USER_DATA_DELETE:
            return {
                ...state,
                loading: false,
                data: state.data.filter(data => data.user !== payload)
            }

        default:
            return state;
    }
}