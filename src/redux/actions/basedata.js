import {
    BASE_DATA_SUCCESS
} from './types';
import axios from 'axios';
import { getMessage, getError } from './messages';

export const getBaseData = () => dispatch => {
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