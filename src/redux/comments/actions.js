import {
    COMMENT_LOADING,
    COMMENT_GET_BY_ITEM,
    COMMENT_ERROR,
    COMMENT_ADD,
    COMMENT_UPDATE,
    COMMENT_TOGGLE_LIKE,
    COMMENT_DELETE,
} from './types';
import axios from 'axios';
import { getMessage, getError } from '../actions/messages';

// Basic types
export const commentLoad = () => {
    return {
        type: COMMENT_LOADING
    }
}

export const commentError = (err) => dispatch => {
    dispatch(getError(err))
    
    return dispatch({
        type: COMMENT_ERROR
    })
}

// Get comments by item id
export const getCommentsByItem = itemId => dispatch => {
    dispatch(libraryLoad());

    axios.get(`/api/comments/${itemId}`)
         .then(res => dispatch({
             type: COMMENT_GET_BY_ITEM,
             payload: res.data
         }))
         .catch(err => {
             dispatch(CommentError(err))
         })
}


// Create new comment
export const addComment = data => dispatch => {
    dispatch(commentLoad());

    // Request body
    const body = JSON.stringify(data);

    axios.post('api/comments', body)
         .then(res => dispatch({
             type: COMMENT_ADD,
             payload: res.data
         }))
         .catch(err => {
             dispatch(getError(err))
        })
}

export const editComment = (id, data) => dispatch => {
    // Request body
    const body = JSON.stringify(data);

    axios.put(`api/comments/${id}`, body)
         .then(res => dispatch({
             type: COMMENT_UPDATE,
             payload: res.data
         }))
         .catch(err => {
                dispatch(getError(err))
            })
}

export const voteLibItem = id => async(dispatch) => {
    try {
        const res = await axios.put(`api/comments/${id}/vote`)
        dispatch({
            type: COMMENT_TOGGLE_LIKE,
            payload: {
                id,
                likes: res.data
            }
        })
    }
    catch(err) {
        dispatch(getError(err))
    }
}


export const deleteComment = id => dispatch => {
    dispatch(commentLoad());

    axios.delete(`api/comments/${id}`)
         .then(res => {
             dispatch({
                 type: COMMENT_DELETE,
                 payload: id
             });
             dispatch(getMessage(res.data));
         })
         .catch(err => {
            dispatch(getError(err))
         })
}

