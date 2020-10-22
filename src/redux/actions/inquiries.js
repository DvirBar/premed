import {
    INQUIRY_LOADING,
    INQUIRY_SUCCESS,
    INQUIRY_ERROR,
    INQUIRY_ADD,
    INQUIRY_UPDATE,
    INQUIRY_DELETE,
    INQUIRY_ASSIGN_ADMIN,
    INQUIRY_CHANGE_STATUS,
    INQUIRY_UPDATE_STATUS_NOTE 
} from './types';
import axios from 'axios';
import { getMessage, getError } from './messages';

// Basic types
export const inquiryLoad = () => {
    return {
        type: INQUIRY_LOADING
    }
}

export const inquiryError = () => {
    return {
        type: INQUIRY_ERROR
    }
}

// Get all inquiries
export const getInquiries = () => dispatch => {
    dispatch(inquiryLoad());

    axios.get(`/api/inquiries`)
         .then(res => dispatch({
             type: INQUIRY_SUCCESS,
             payload: res.data
         }))
         .catch(err => {
             dispatch(inquiryError())
             dispatch(getMessage(err))
         })
}

// Get user inquiries
export const getUserInquiries = () => dispatch => {
    dispatch(inquiryLoad());

    axios.get('api/inquiries/user')
         .then(res => dispatch({
             type: INQUIRY_SUCCESS,
             payload: res.data
         }))
         .catch(err => {
             dispatch(inquiryError());
             dispatch(getError(err));
         });
}

// Create new inquiry
export const addInquiry = data => dispatch => {
    dispatch(inquiryLoad());

    // Request body
    const body = JSON.stringify(data);

    axios.post('api/inquiries', body)
         .then(res => dispatch({
             type: INQUIRY_ADD,
             payload: res.data
         }))
         .catch(err => {
             dispatch(inquiryError())
             dispatch(getError(err))
            })
}

export const editInquiry = (id, data) => dispatch => {
    dispatch(inquiryLoad());
    
    // Request body
    const body = JSON.stringify(data);

    axios.put(`api/inquiries/${id}`, body)
         .then(res => dispatch({
             type: INQUIRY_UPDATE,
             payload: res.data
         }))
         .catch(err => {
                dispatch(inquiryError())
                dispatch(getError(err))
            })
}

export const assignAdmin = (id, data) => dispatch => {
    dispatch(inquiryLoad());
    
    // Request body
    const body = JSON.stringify(data);

    axios.put(`api/inquiries/${id}/assignAdmin`, body)
         .then(res => dispatch({
             type: INQUIRY_ASSIGN_ADMIN,
             payload: {
                 inquiryId: id,
                 admin: res.data
             }
         }))
         .catch(err => {
                dispatch(inquiryError())
                dispatch(getError(err))
            })
}

export const changeStatus = (id, data) => dispatch => {
    dispatch(inquiryLoad());
    
    // Request body
    const body = JSON.stringify(data);

    axios.put(`api/inquiries/${id}/changeStatus`, body)
         .then(res => dispatch({
             type: INQUIRY_CHANGE_STATUS,
             payload: {
                 inquiryId: id,
                 statuses: res.data
             }
         }))
         .catch(err => {
                dispatch(inquiryError())
                dispatch(getError(err))
            })
}

export const updateStatusNote = (id, statusId, data) => dispatch => {
    dispatch(inquiryLoad());
    
    // Request body
    const body = JSON.stringify(data);

    axios.put(`api/inquiries/${id}/${statusId}`, body)
         .then(res => dispatch({
             type: INQUIRY_UPDATE_STATUS_NOTE,
             payload: {
                 inquiryId: id,
                 statusId: statusId,
                 status: res.data
             }
         }))
         .catch(err => {
                dispatch(inquiryError())
                dispatch(getError(err))
            })
}

export const deleteInquiry = id => dispatch => {
    dispatch(inquiryLoad());

    axios.delete(`api/inquiries/${id}`)
         .then(res => {
             dispatch({
                 type: INQUIRY_DELETE,
                 payload: id
             });
             dispatch(getMessage(res.data));
         })
         .catch(err => {
            dispatch(inquiryError())
            dispatch(getError(err))
         })
}

