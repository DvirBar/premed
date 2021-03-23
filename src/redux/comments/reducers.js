import {
    COMMENT_LOADING,
    COMMENT_GET_BY_ITEM,
    COMMENT_ERROR,
    COMMENT_ADD,
    COMMENT_UPDATE,
    COMMENT_TOGGLE_LIKE,
    COMMENT_DELETE
} from '../actions/types';

const initialState = {
    loading: false,
    comments: []
}

export default function(state = initialState, action) {
    const payload = action.payload;
    
    switch(action.type) {
        case COMMENT_LOADING:
            return {
                ...state,
                loading: true
            }

        case COMMENT_SUCCESS:
            return {
                ...state,
                loading: false,
                comments: payload
            }

        case COMMENT_ERROR:
            return {
                ...state,
                loading: false,
                comments: [],
            }

        case COMMENT_ADD:
            return {
                ...state,
                loading: false,
                comments: [...state.comments, payload]
            }

        case COMMENT_UPDATE:
            return {
                ...state,
                loading: false,
                comments: state.comments.map(comment => 
                    comment._id === payload._id ? payload : comment)
            }

        case COMMENT_TOGGLE_LIKE: 
            return {
                ...state,
                loading: false,
                comments: state.comments.map(comment => 
                    comment._id === payload.id 
                    ? {
                        ...comment,
                        likes: payload.likes
                    }
                    : comment)
            }

        case COMMENT_DELETE:
            return {
                ...state,
                loading: false,
                comments: state.comments.filter(comment => 
                    comment._id !== payload)
            }
        
        default:
            return state;
    }
}