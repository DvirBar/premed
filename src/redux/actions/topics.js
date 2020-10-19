import {
    TOPIC_LOADING,
    TOPIC_SUCCESS,
    TOPIC_ERROR,
    TOPIC_ADD,
    TOPIC_UPDATE,
    TOPIC_DELETE,
    TOPIC_ITEM_ADD,
    TOPIC_ITEM_UPDATE,
    TOPIC_ITEM_TOGGLE_UPVOTE,
    TOPIC_ITEM_TOGGLE_DOWNVOTE,
    TOPIC_ITEM_COMMENT_ADD,
    TOPIC_ITEM_COMMENT_UPDATE,
    TOPIC_ITEM_COMMENT_TOGGLE_LIKE,
    TOPIC_ITEM_COMMENT_DELETE, 
    TOPIC_ITEM_DELETE
} from '../actions/types';
import axios from 'axios';
import { getMessage, getError } from './messages';

// Basic types
export const topicLoad = () => {
    return {
        type: TOPIC_LOADING
    }
}

export const topicError = () => {
    return {
        type: TOPIC_ERROR
    }
}

// Get all topics
export const getTopics = () => dispatch => {
    dispatch(topicLoad());

    axios.get('api/topics')
         .then(res => dispatch({
             type: TOPIC_SUCCESS,
             payload: res.data
         }))
         .catch(err => {
             dispatch(topicError());
             dispatch(getError(err));
         });
}

// Create new topic
export const addTopic = data => dispatch => {
    // Request body
    const body = JSON.stringify(data);

    axios.post('api/topics', body)
         .then(res => dispatch({
             type: TOPIC_ADD,
             payload: res.data
         }))
         .catch(err => dispatch(getError(err)))
}

export const editTopic = (id, data) => dispatch => {
    // Request body
    const body = JSON.stringify(data);

    axios.put(`api/topics/${id}`, body)
         .then(res => dispatch({
             type: TOPIC_UPDATE,
             payload: res.data
         }))
         .catch(err => dispatch(getError(err)))
}

export const deleteTopic = id => dispatch => {

    axios.delete(`api/topics/${id}`)
         .then(res => {
             dispatch({
                 type: TOPIC_DELETE,
                 payload: id
             });
             dispatch(getMessage(res.data));
         })
         .catch(err => dispatch(getError(err)))
}

export const addItem = (topicId, data) => dispatch => {
    // Request body
    const body = JSON.stringify(data);

    axios.put(`api/topics/${topicId}/item`, body)
         .then(res => dispatch({
             type: TOPIC_ITEM_ADD,
             payload: res.data
         }))
         .catch(err => dispatch(getError(err)))
}

export const editItem = (topicId, itemId, data) => dispatch => {
    // Request body
    const body = JSON.stringify(data);

    axios.put(`api/topics/${topicId}/${itemId}`, body)
         .then(res => dispatch({
             type: TOPIC_ITEM_UPDATE,
             payload: res.data
         }))
         .catch(err => dispatch(getError(err)))
}

export const toggleUpvote = (topicId, itemId) => dispatch => {
    axios.put(`api/topics/${topicId}/${itemId}/toggleUpvote`)
         .then(res => dispatch({
             type: TOPIC_ITEM_TOGGLE_UPVOTE,
             payload: {
                topicId,
                itemId,
                data: res.data
            }
         }))
         .catch(err => dispatch(getError(err)))
}

export const toggleDownvote = (topicId, itemId) => dispatch => {
    axios.put(`api/topics/${topicId}/${itemId}/toggleDownvote`)
         .then(res => dispatch({
             type: TOPIC_ITEM_TOGGLE_DOWNVOTE,
             payload: {
                topicId,
                itemId,
                data: res.data
            }
         }))
         .catch(err => dispatch(getError(err)))
}


export const addComment = (topicId, itemId, data) => dispatch => {
    const body = JSON.stringify(data)

    axios.put(`api/topics/${topicId}/${itemId}/addComment`, body)
         .then(res => dispatch({
             type: TOPIC_ITEM_COMMENT_ADD,
             payload: {
                topicId,
                itemId,
                comments: res.data
            }
         }))
         .catch(err => dispatch(getError(err)))
}

export const editComment = (topicId, itemId, commentId, data) => dispatch => {
    const body = JSON.stringify(data)

    axios.put(`api/topics/${topicId}/${itemId}/${commentId}/editComment`, body)
         .then(res => dispatch({
             type: TOPIC_ITEM_COMMENT_UPDATE,
             payload:  {
                topicId,
                itemId,
                commentId,
                comment: res.data
            }
         }))
         .catch(err => dispatch(getError(err)))
}


export const toggleLikeComment = (topicId, itemId, commentId) => dispatch => {
    axios.put(`api/topics/${topicId}/${itemId}/${commentId}/toggleLike`)
         .then(res => dispatch({
             type: TOPIC_ITEM_COMMENT_TOGGLE_LIKE,
             payload:  {
                topicId,
                itemId,
                commentId,
                likes: res.data
            }
         }))
         .catch(err => dispatch(getError(err)))
}


export const deleteComment = (topicId, itemId, commentId) => dispatch => {
    axios.put(`api/topics/${topicId}/${itemId}/${commentId}/remove`)
         .then(res => dispatch({
             type: TOPIC_ITEM_COMMENT_DELETE,
             payload: {
                 topicId,
                 itemId,
                 commentId
             }
         }))
         .catch(err => dispatch(getError(err)))
}


export const deleteItem = (topicId, itemId) => dispatch => {

    axios.put(`api/topics/${topicId}/${itemId}/remove`)
         .then(res => dispatch({
             type: TOPIC_ITEM_DELETE,
             payload: res.data
         }))
         .catch(err => dispatch(getError(err)))
}


