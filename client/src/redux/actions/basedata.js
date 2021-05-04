import {
    BASE_DATA_SUCCESS,
    STATS_INPUTS_LOADING,
    STATS_INPUTS_SUCCESS,
    GET_TABLE_SETCIONS,
    BASE_DATA_LOADING
} from './types';
import axios from 'axios';
import { getError } from './messages';

export const getBaseData = () => dispatch => {
    dispatch({
        type: BASE_DATA_LOADING
    })

    axios.get('api/serverdata/baseData')
         .then(res => {
             dispatch({
                 type: BASE_DATA_SUCCESS,
                 payload: res.data
             })
         })
         .catch(err => {
            dispatch(getError(err))
         })
}

export const getStatsInputs = pathIds => dispatch => {
    dispatch({
        type: STATS_INPUTS_LOADING
    })

    const body = JSON.stringify({
        pathIds
    })


    axios.post('api/serverdata/statsData', body)
         .then(res => {
             dispatch({
                 type: STATS_INPUTS_SUCCESS,
                 payload: res.data
             })
         })
         .catch(err => {
            dispatch(getError(err))
         })
}

export const getTableSections = () => dispatch => {
    axios.get('api/serverdata/tableSections')
         .then(res => dispatch({
             type: GET_TABLE_SETCIONS,
             payload: res.data
         }))
         .catch(err => {
             dispatch(getError(err))
         })
}