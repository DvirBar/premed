import {
    ANC_LOADING,
    ANC_SUCCESS,
    ANC_ERROR,
    ANC_ADD,
    ANC_UPDATE,
    ANC_DELETE
} from './types';
import axios from 'axios';


// Basic types
export const ancLoad = () => {
    return {
        type: ANC_LOADING
    }
}

export const ancSuccess = res => {
    return {
        type: ANC_SUCCESS,
        payload: res
    }
}

export const ancError = () => {
    return {
        type: ANC_ERROR
    }
}

export const ancAdd = res => {
    return {
        type: ANC_ADD,
        payload: res
    }
}

export const ancUpdate = res => {
    return {
        type: ANC_UPDATE,
        payload: res
    }
}

export const ancDelete = id => {
    return {
        type: ANC_DELETE,
        payload: id
    }
}

// Get anouncement
export const getAnc = () => dispatch => {
    dispatch(ancLoad());

    axios
        .get('/api/anouncements')
        .then(res => dispatch(ancSuccess(res.data)))
        .catch(err => {
            // Get message
            dispatch(ancError());
        })
}


// Add new anouncement
export const addAnc = data => dispatch => {
    dispatch(ancLoad());

    // Reuest body 
    const body = JSON.stringify(data);

    // Send request
    axios
        .post('/api/anouncements', body)
        .then(res => dispatch(ancSuccess(res.data)))
        .catch(err => {
            // Get message
            console.log("Adding error")
        })
}

// Edit anouncement
export const editAnc = (data, id) => dispatch => {
    dispatch(ancLoad());

    // Request body
    const body = JSON.stringify(data)

    axios
        .put(`/api/anouncements/${id}`, body)
        .then(res => dispatch(ancSuccess(res.data)))
        .catch(err => {
            // Get message
            console.log("Error editing");
        })
}

// Delete anouncement
export const deleteAnc = id => dispatch => {
    dispatch(ancLoad());

    axios
        .delete(`/api/anouncements/${id}`)
        .then(res =>
            // Get message 
            dispatch(ancDelete(id)))
        .catch(err => {
            // Get message
            console.log("Error deleting");
        })
}