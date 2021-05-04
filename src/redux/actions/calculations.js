import {
    CALC_LOADING,
    CALC_SUCCESS,
    CALC_ERROR,
    CALC_ADD,
    CALC_UPDATE,
    CALC_DELETE,
    STORED_CALCS_GET,
    CALC_ASSIGN_ROLE
} from './types';
import axios from 'axios';
import { getMessage, getError } from './messages';

// Basic types
export const calcLoad = () => {
    return {
        type: CALC_LOADING
    }
}

export const calcError = () => {
    return {
        type: CALC_ERROR
    }
}

// Get calculations by paths
export const getCalcsByPaths = data => dispatch => {
    dispatch(calcLoad());

    // Request body
    const body = JSON.stringify(data);

    axios.get(`/api/calculations/${body}`)
         .then(res => dispatch({
             type: CALC_SUCCESS,
             payload: res.data
         }))
         .catch(err => {
             dispatch(calcError())
             dispatch(getMessage(err))
         })

}

// Get all calculations
export const getCalcs = () => dispatch => {
    dispatch(calcLoad());

    axios.get('api/calculations')
         .then(res => { 
             dispatch({
                type: CALC_SUCCESS,
                payload: res.data
            })})
         .catch(err => {
             dispatch(calcError());
             dispatch(getError(err));
         });
}

// Create new calculation
export const addCalc = data => dispatch => {
    // Request body
    const body = JSON.stringify(data);

    axios.post('api/calculations', body)
         .then(res => {
             dispatch ({
                type: CALC_ADD,
                payload: res.data
             })})
         .catch(err => {
             dispatch(calcError())
             dispatch(getError(err))
            })
}

export const editCalc = (id, data) => dispatch => {
    dispatch(calcLoad());
    
    // Request body
    const body = JSON.stringify(data);

    axios.put(`api/calculations/${id}`, body)
         .then(res => 
            dispatch({
                type: CALC_UPDATE,
                payload: res.data
             }))
         .catch(err => {
             dispatch(calcError())
             dispatch(getError(err))
            })
}

export const deleteCalc = id => dispatch => {
    dispatch(calcLoad());

    axios.delete(`api/calculations/${id}`)
         .then(res => {
             dispatch({
                type: CALC_DELETE,
                payload: id
             })
             dispatch(getMessage(res.data))
         })
         .catch(err => {
            dispatch(calcError())
            dispatch(getError(err))
         })
}

export const getStoredCalcs = () => dispatch => {
    dispatch(calcLoad());
    
    axios.get('api/calculations/storedCalcs')
         .then(res => dispatch({
             type: STORED_CALCS_GET,
             payload: res.data
         }))
}

export const calcAssignRole = (id, data) => dispatch => {
    // Request body
    const body = JSON.stringify(data)

    axios.put(`api/calculations/${id}/assignRole`, body)
         .then(res => dispatch({
             type: CALC_ASSIGN_ROLE,
             payload: res.data
         }))
         .catch(err => {
             dispatch(calcError())
             dispatch(getMessage(err))
         })
}


