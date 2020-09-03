import {
    TOPIC_LOADING,
    TOPIC_SUCCESS,
    TOPIC_ERROR,
    TOPIC_ADD,
    TOPIC_UPDATE,
    TOPIC_DELETE,
    TOPIC_ITEM_ADD,
    TOPIC_ITEM_UPDATE,
    TOPIC_ITEM_TOGGLE_LIKE,
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

export const topicSuccess = topics => {
    return {
        type: TOPIC_SUCCESS,
        payload: topics
    }
}

export const topicError = () => {
    return {
        type: TOPIC_ERROR
    }
}

export const topicAdd = topic => {
    return {
        type: TOPIC_ADD,
        payload: topic
    }
}

export const topicUpdate = topic => {
    return {
        type: TOPIC_UPDATE,
        payload: topic
    }
}

export const topicDelete = id => {
    return {
        type: TOPIC_DELETE,
        payload: id
    }
}

export const itemAdd = topic => {
    return {
        type: TOPIC_ITEM_ADD,
        payload: topic
    }
}

export const itemUpdate = topic => {
    return {
        type: TOPIC_ITEM_UPDATE,
        payload: topic
    }
}

export const itemToggleLike = topic => {
    return {
        type: TOPIC_ITEM_TOGGLE_LIKE,
        payload: topic
    }
}

export const itemDelete = topic => {
    return {
        type: TOPIC_ITEM_DELETE,
        payload: topic
    }
}

// Get all topics
export const getTopics = () => dispatch => {
    dispatch(topicLoad());

    axios.get('api/topics')
         .then(res => dispatch(topicSuccess(res.data)))
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
         .then(res => dispatch(topicAdd(res.data)))
         .catch(err => dispatch(getError(err)))
}

export const editTopic = (id, data) => dispatch => {
    // Request body
    const body = JSON.stringify(data);
    console.log(body)

    axios.put(`api/topics/${id}`, body)
         .then(res => dispatch(topicUpdate(res.data)))
         .catch(err => dispatch(getError(err)))
}

export const deleteTopic = id => dispatch => {

    axios.delete(`api/topics/${id}`)
         .then(res => {
             dispatch(topicDelete(id));
             dispatch(getMessage(res.data));
         })
         .catch(err => dispatch(getError(err)))
}

export const addItem = (topicId, data) => dispatch => {
    // Request body
    const body = JSON.stringify(data);

    axios.put(`api/topics/${topicId}/item`, body)
         .then(res => dispatch(itemAdd(res.data)))
         .catch(err => dispatch(getError(err)))
}

export const editItem = (topicId, itemId, data) => dispatch => {
    // Request body
    const body = JSON.stringify(data);

    axios.put(`api/topics/${topicId}/${itemId}`, body)
         .then(res => dispatch(itemUpdate(res.data)))
         .catch(err => dispatch(getError(err)))
}

export const toggleLike = (topicId, itemId) => dispatch => {
    axios.put(`api/topics/${topicId}/${itemId}/toggleLike`)
         .then(res => dispatch(itemToggleLike(res.data)))
         .catch(err => dispatch(getError(err)))
}

export const deleteItem = (topicId, itemId) => dispatch => {

    axios.put(`api/topics/${topicId}/${itemId}/remove`)
         .then(res => dispatch(itemDelete(res.data)))
         .catch(err => dispatch(getError(err)))
}


