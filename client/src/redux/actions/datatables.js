import {
    TABLE_LOADING,
    TABLE_SUCCESS,
    TABLE_ERROR,
    TABLE_ADD,
    TABLE_UPDATE,
    TABLE_TOGGLE_ENABLED,
    TABLE_DELETE,
    THRESHOLD_ADD,
    THRESHOLD_UPDATE,
    THRESHOLD_DELETE
} from './types';
import axios from 'axios';
import { getMessage, getError } from './messages';

// Basic types
export const tableLoad = () => {
    return {
        type: TABLE_LOADING
    }
}

export const tableError = () => {
    return {
        type: TABLE_ERROR
    }
}


// Get all tables
export const getTables = () => dispatch => {
    dispatch(tableLoad());

    axios.get('api/datatables')
         .then(res => { 
             dispatch({
                type: TABLE_SUCCESS,
                payload: res.data
            })})
         .catch(err => {
             dispatch(tableError());
             dispatch(getError(err));
         });
}

// Create new table
export const addTable = data => dispatch => {
    dispatch(tableLoad());

    // Request body
    const body = JSON.stringify(data);

    axios.post('api/datatables', body)
         .then(res => {
             dispatch ({
                type: TABLE_ADD,
                payload: res.data
             })})
         .catch(err => {
             dispatch(tableError())
             dispatch(getError(err))
            })
}

export const editTable = (id, data) => dispatch => {
    dispatch(tableLoad());
    
    // Request body
    const body = JSON.stringify(data);

    axios.put(`api/datatables/${id}`, body)
         .then(res => 
            dispatch({
                type: TABLE_UPDATE,
                payload: res.data
             }))
         .catch(err => {
             dispatch(tableError())
             dispatch(getError(err))
            })
}

export const toggleEnabled = id => dispatch => {
    dispatch(tableLoad());

    axios.put(`api/datatables/${id}/toggleEnabled`)
         .then(res => 
            dispatch({
                type: TABLE_TOGGLE_ENABLED,
                payload: res.data
             }))
         .catch(err => {
             dispatch(tableError())
             dispatch(getError(err))
            })
}

export const addThreshold = (tableId, data) => dispatch => {
    const body = JSON.stringify(data)

    axios.put(`api/datatables/${tableId}/addThreshold`, body)
         .then(res => dispatch({
             type: THRESHOLD_ADD,
             payload: {
                 tableId,
                 threshold: res.data
             }
         }))
         .catch(err => {
             dispatch(tableError())
             dispatch(getMessage(err))
         })
}


export const editThreshold = (tableId, threshId, data) => dispatch => {
    const body = JSON.stringify(data)

    axios.put(`api/datatables/${tableId}/${threshId}`, body)
         .then(res => dispatch({
             type: THRESHOLD_UPDATE,
             payload: {
                tableId,
                thresholds: res.data
            }
         }))
         .catch(err => {
             dispatch(tableError())
             dispatch(getMessage(err))
         })
}


export const deleteThreshold = (tableId, threshId) => dispatch => {
    axios.put(`api/datatables/${tableId}/${threshId}/remove`)
         .then(res => {
             dispatch({
                type: THRESHOLD_DELETE,
                payload: {
                    tableId,
                    threshId
                }
            })
            dispatch(getMessage(res.data))
        })
         .catch(err => {
             console.log(err);
             dispatch(tableError())
             dispatch(getMessage(err))
         })
}


export const deleteTable = id => dispatch => {
    dispatch(tableLoad());

    axios.delete(`api/datatables/${id}`)
         .then(res => {
             dispatch({
                type: TABLE_DELETE,
                payload: id
             })
             dispatch(getMessage(res.data))
         })
         .catch(err => {
            dispatch(tableError())
            dispatch(getError(err))
         })
}

