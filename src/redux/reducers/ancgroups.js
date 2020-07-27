import {
    GROUP_LOADING,
    GROUP_SUCCESS,
    GROUP_ERROR,
    USER_SUBSCRIBES,
    GROUP_ADD,
    GROUP_UPDATE,
    GROUP_SUBSCRIBE,
    GROUP_UNSUBSCRIBE,
    GROUP_DELETE,
} from '../actions/types';

const initialState = {
    loading: false,
    groups: [],
    userSubs: []
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
            return {
                ...state,
                loading: false,
                groups: payload
            }

        case GROUP_ERROR:
            return {
                ...state,
                loading: false,
                groups: [],
                userSubscirbes: []
            }
        
        case USER_SUBSCRIBES:
            return {
                ...state,
                loading: false,
                userSubscirbes: payload
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

        case GROUP_SUBSCRIBE:
            return {
                ...state,
                loading: false,
                userSubscirbes: [...state.userSubscirbes, payload]
            }

        case GROUP_UNSUBSCRIBE:
            return {
                ...state,
                loading: false,
                userSubscribes: state.userSubscirbes.filter(sub => sub !== payload)
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