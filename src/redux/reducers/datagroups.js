import {
    DATA_GROUP_LOADING,
    DATA_GROUP_SUCCESS,
    DATA_GROUP_ERROR,
    DATA_GROUP_ADD,
    DATA_GROUP_UPDATE,
    DATA_GROUP_DELETE,
    DATA_GROUP_ASSIGN_ROLE
} from '../actions/types';

const initialState = {
    loading: false,
    groups: []
}

export default function(state = initialState, action) {
    const payload = action.payload;

    switch(action.type) {
        case DATA_GROUP_LOADING:
            return {
                ...state,
                loading: true
            }

        case DATA_GROUP_SUCCESS: 
            return {
                ...state,
                loading: false,
                groups: payload
            }

        case DATA_GROUP_ERROR:
            return {
                ...state,
                loading: false,
            }

        case DATA_GROUP_ADD:
            return {
                ...state,
                loading: false,
                groups: [...state.groups, payload]
            }

        case DATA_GROUP_UPDATE:
            return {
                ...state,
                loading: false,
                groups: state.groups.map(group => 
                    group._id === payload._id ? group = payload : group)
            }

        case DATA_GROUP_ASSIGN_ROLE:
            return {
                ...state,
                loading: false,
                groups: state.groups.map(group => {
                    let tempGroup = payload.find(curGroup => 
                        curGroup._id === group._id)
                    
                    return tempGroup ? group = tempGroup : group
                })
            }

        case DATA_GROUP_DELETE:
            return {
                ...state,
                groups: state.groups.filter(group => 
                    group._id !== payload)
            }

        default:
            return state;
    }
}

