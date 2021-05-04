import {
    QUEST_GROUP_LOADING,
    QUEST_GROUP_SUCCESS,
    QUEST_GROUP_ERROR,
    QUEST_GROUP_ADD,
    QUEST_GROUP_UPDATE,
    QUEST_GROUP_DELETE,
    QUEST_ADD,
    QUEST_UPDATE,
    QUEST_DELETE
} from './types';
import axios from 'axios';
import { getMessage, getError } from '../actions/messages';

const baseUrl = 'api/questions'

// Basic types
export const questGroupLoad = () => {
    return {
        type: QUEST_GROUP_LOADING
    }
}

export const questGroupError = () => {
    return {
        type: QUEST_GROUP_ERROR
    }
}

// Get all groups
export const getQuestGroupByPath = pathId => dispatch => {
    dispatch(questGroupLoad());

    axios.get(`${baseUrl}/path/${pathId}`)
         .then(res => dispatch({
             type: QUEST_GROUP_SUCCESS,
             payload: res.data
         }))
         .catch(err => {
             dispatch(questGroupError());
             dispatch(getError(err));
         });
}

// Create new grouop
export const addQuestGroup = data => dispatch => {
    // Request body
    const body = JSON.stringify(data);

    axios.post(baseUrl, body)
         .then(res => dispatch({
             type: QUEST_GROUP_ADD,
             payload: res.data
         }))
         .catch(err => {
                dispatch(questGroupError())
                dispatch(getError(err))
        })
}

export const editQuestGroup = (id, data) => dispatch => {
    // Request body
    const body = JSON.stringify(data);

    axios.put(`${baseUrl}/${id}`, body)
         .then(res => dispatch({
             type: QUEST_GROUP_UPDATE,
             payload: res.data
         }))
         .catch(err => {
             dispatch(questGroupError())
             dispatch(getError(err))
        })
             
}

export const deleteQuestGroup = id => dispatch => {

    axios.delete(`${baseUrl}/${id}`)
         .then(res => {
             dispatch({
                 type: QUEST_GROUP_DELETE,
                 payload: id
             });
             dispatch(getMessage(res.data));
         })
         .catch(err => {
             dispatch(questGroupError())
             dispatch(getError(err))
        })
}

export const addQuest = (groupId, data) => dispatch => {
    // Request body
    const body = JSON.stringify(data);

    axios.put(`${baseUrl}/${groupId}/addQuestion`, body)
         .then(res => dispatch({
             type: QUEST_ADD,
             payload: {
                 groupId,
                 data: res.data
             }
         }))
         .catch(err => {
             dispatch(questGroupError())
             dispatch(getError(err))
        })
}

export const editQuest = (groupId, questId, data) => dispatch => {
    // Request body
    const body = JSON.stringify(data);

    axios.put(`${baseUrl}/${groupId}/${questId}`, body)
         .then(res => dispatch({
             type: QUEST_UPDATE,
             payload: {
                groupId,
                questId,
                data: res.data
            }
         }))
         .catch(err => {
             dispatch(questGroupError())
             dispatch(getError(err))
            })
}

export const deleteQuest = (groupId, questId) => dispatch => {

    axios.put(`${baseUrl}/${groupId}/${questId}/remove`)
         .then(res => {
             dispatch({
                type: QUEST_DELETE,
                payload: {
                    groupId,
                    questId
                    }
            })

            dispatch(getMessage(res.data))
        })
         .catch(err => {
             dispatch(questGroupError())
             dispatch(getError(err))
            })
}


