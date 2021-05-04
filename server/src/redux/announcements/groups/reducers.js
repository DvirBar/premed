import {
    GROUP_LOADING,
    GROUP_SUCCESS,
    GROUP_ERROR,
    GET_GROUPS_USER_SUBSCRIBES,
    GROUP_ADD,
    GROUP_UPDATE,
    GROUP_CHANGE_SUB,
    GROUP_COMMIT_SUBSCRIPTION_SUCCESS,
    GROUP_DELETE,
} from './types';

const initialState = {
    loading: false,
    groups: []
}

export default function(state = initialState, action) {
    const payload = action.payload;
    
    switch(action.type) {
        case GROUP_LOADING:
            return {
                ...state,
                loading: true
            }

        case GROUP_SUCCESS:
        case GET_GROUPS_USER_SUBSCRIBES:
            return {
                ...state,
                loading: false,
                groups: payload
            }

        case GROUP_ERROR:
            return {
                ...state,
                loading: false
            }

        case GROUP_ADD:
            return {
                ...state,
                loading: false,
                groups: [...state.groups, payload]
            }

        case GROUP_UPDATE:
            return {
                ...state,
                loading: false,
                groups: state.groups.map(group => 
                    group._id === payload._id ? group = payload : group)
            }
        case GROUP_CHANGE_SUB:
            return {
                ...state,
                loading: false,
                groups: state.groups.map(group => 
                    group._id === payload.groupId
                    ? {
                        ...group,
                        subscriptions: payload.sub
                    }
                    : group)
            }

        case GROUP_COMMIT_SUBSCRIPTION_SUCCESS:
            return {
                ...state,
                loading: false,
                groups: state.groups.map(group => 
                    payload[group._id] 
                    ? {
                        ...group,
                        subscriptions: payload[group._id]
                    }
                    : group)
            }

        case GROUP_DELETE:
            return {
                ...state,
                loading: false,
                groups: state.groups.filter(group => group._id !== payload)
            }
        
        default:
            return state;
    }
}