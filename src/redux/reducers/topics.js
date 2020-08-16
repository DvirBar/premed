import {
    TOPIC_LOADING,
    TOPIC_SUCCESS,
    TOPIC_ERROR,
    TOPIC_ADD,
    TOPIC_UPDATE,
    TOPIC_DELETE,
    ITEM_ADD,
    ITEM_UPDATE,
    ITEM_TOGGLE_LIKE,
    ITEM_DELETE
} from '../actions/types';

const initialState = {
    loading: false,
    topics:[]
}

export default function(state = initialState, action) {
    const payload = action.payload

    switch(action.type) {
        case TOPIC_LOADING:
            return {
                ...state,
                loading: true
            }

        case TOPIC_SUCCESS:
            return {
                ...state,
                loading: false,
                topics: payload
            }

        case TOPIC_ERROR: 
            return {
                ...state,
                loading: false,
                topics: []
            }

        case TOPIC_ADD:
            return {
                ...state,
                topics: [...state.topics, payload]
            }

        case TOPIC_UPDATE:
        case ITEM_ADD:
        case ITEM_UPDATE:
        case ITEM_TOGGLE_LIKE:
        case ITEM_DELETE:
            return {
                ...state,
                loading: false,
                topics: state.topics.map(topic => 
                    topic.id === payload.id ? topic = payload : topic)
            }

        case TOPIC_DELETE: 
            return {
                ...state,
                loading: false,
                topics: state.topics.filter(topic => topic.id !== payload)
            }

        default: 
            return state;
    }
}