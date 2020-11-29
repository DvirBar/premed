import {
    USER_DATA_LOADING,
    USER_DATA_LOAD_SOFT,
    USER_DATA_SUCCESS,
    USER_DATA_PATH_SUCCESS,    
    USER_DATA_ERROR,
    USER_DATA_ADD,
    CHANGE_TABLE,
    COPY_DATA_SIMULATION,
    SIMULATE_CALCS,
    INSERT_DATA_SIMULATION,
    USER_DATA_UPDATE_PATHS,
    USER_DATA_SWITCH_TABLE,
    USER_DATA_INSERT,
    USER_DATA_TOGGLE_ENABLED,
    EXEC_CALC,
    USER_DATA_DELETE,
    FILTER_DATA,
    REMOVE_FILTER_DATA,
    SORT_DATA
} from './types';
import axios from 'axios';
import { getMessage, getError } from './messages';

// Basic types
export const dataLoad = () => {
    return {
        type: USER_DATA_LOADING
    }
}

export const dataLoadSoft = () => {
    return {
        type: USER_DATA_LOAD_SOFT
    }
}

export const dataError = () => {
    return {
        type: USER_DATA_ERROR
    }
}

export const copyDataSimulation = () => dispatch => {
    dispatch(dataLoad())

    return {
        type: COPY_DATA_SIMULATION
    }
}

// Get one user data
export const getOneUserData = tableId => dispatch => {
    dispatch(dataLoad());

    const body = JSON.stringify({
        tableId
    })

    axios.post('api/userdata/user', body)
         .then(res => { 
             dispatch({
                type: USER_DATA_SUCCESS,
                payload: {
                    data: res.data,
                    selTable: tableId || res.data.tableData.table._id
                }
            })})
         .catch(err => {
             dispatch(dataError());
         });
}

// Get all users data by path and tableId
export const getUsersDataByPathTable = (tableId, pathId) => dispatch => {
    dispatch(dataLoad());

    axios.get(`api/userdata/${tableId}/${pathId}`)
         .then(res => { 
             dispatch({
                type: USER_DATA_PATH_SUCCESS,
                payload: res.data
            })})
         .catch(err => {
             dispatch(dataError());
             dispatch(getError(err));
         });
}

// Create new user data collection
export const addUserData = data => dispatch => {
    // Request body
    const body = JSON.stringify(data);

    axios.post('api/userdata', body)
         .then(res => {
             dispatch ({
                type: USER_DATA_ADD,
                payload: res.data
             })})
         .catch(err => {
             dispatch(dataError())
             dispatch(getError(err))
            })
}

// Change selected data table
export const changeSelTable = tableId => dispatch => {
    dispatch(dataLoad())
    dispatch({
        type: CHANGE_TABLE,
        payload: tableId
    })
}

// Copy data to simaltion data
export const copyToSimulate = (tableId, fields) => dispatch => {
    dispatch(dataLoad())

    dispatch({
        type: COPY_DATA_SIMULATION,
        payload: {
            tableId,
            fields
        }
    })
}

// Simulate calculations and get results
export const simulateCalcs = data => dispatch => {
    // Request body
    const body = JSON.stringify(data);

    axios.post('api/userdata/simulateCalcs', body)
         .then(res => {
             dispatch ({
                type: SIMULATE_CALCS,
                payload: res.data
             })})
         .catch(err => {
             console.log(err);
             dispatch(dataError())
             dispatch(getError(err))
            })
}

// Insert data to simulation vals
export const insertDataSimulation = (field, value) => dispatch => {
    dispatch({
        type: INSERT_DATA_SIMULATION,
        payload: {
            field,
            value
        }
    })
}

// Edit user paths
export const editUserDataPaths = (tableId, data) => dispatch => {
    dispatch(dataLoad());

    // Request body
    const body = JSON.stringify(data);

    axios.put(`api/userdata/editpaths/${tableId}`, body)
         .then(res => 
            dispatch({
                type: USER_DATA_UPDATE_PATHS,
                payload: {
                    paths: res.data,
                    tableId
                }
             }))
         .catch(err => {
             dispatch(dataError())
             dispatch(getError(err))
            })
}

// Switch to the currently enabled table
export const switchTable = () => dispatch => {
    dispatch(dataLoad());

    axios.put('api/userdata/switchtable')
         .then(res => dispatch({
             type: USER_DATA_SWITCH_TABLE,
             // returns switched table
             payload: res.data
         }))
         .catch(err => {
             dispatch(dataError())
             dispatch(getMessage(err))
         })
}

// Insert new data to user data collection
export const insertData = (tableId, data) => dispatch => {
    dispatch(dataLoadSoft());
    // TODO: Prompt user on successful save 
    
    // Request body
    const body = JSON.stringify(data);

    axios.put(`api/userdata/insertdata/${tableId}`, body)
         .then(res => 
            dispatch({
                type: USER_DATA_INSERT,
                payload: {
                    tableId,
                    dataVal: res.data
                }
             }))
         .catch(err => {
             console.log(err);
             dispatch(dataError())
             // Returns modified/added dataVal
             dispatch(getError(err))
            })
}

// Toggle user data enabled status
export const toggleEnabled = tableId => dispatch => {
    dispatch(dataLoadSoft());

    axios.put(`api/userdata/toggleEnabled/${tableId}`)
         .then(res => 
            dispatch({
                type: USER_DATA_TOGGLE_ENABLED,
                payload: res.data
             }))
         .catch(err => {
             dispatch(dataError())
             dispatch(getError(err))
            })
}

// Execute calculation
export const executeCalc = calcsToExec => dispatch => {
    const data = {
        calcsToExec: calcsToExec
    }

    const body = JSON.stringify(data)

    axios.put(`/api/userdata/execCalc`, body)
         .then(res => dispatch({
             type: EXEC_CALC,
             payload: res.data
         }))
         .catch(err => {
             console.log(err);
             dispatch(dataError())
             dispatch(getError(err))
         })
}

// Delete all data for the user
export const deleteUserData = userId => dispatch => {
    dispatch(dataLoad());

    axios.delete(`api/userdata/${userId}`)
         .then(res => {
             dispatch({
                type: USER_DATA_DELETE,
                payload: userId
             })
             dispatch(getMessage(res.data))
         })
         .catch(err => {
            dispatch(dataError())
            dispatch(getError(err))
         })
}

export const filterData = filter => dispatch => {
    dispatch({
        type: FILTER_DATA,
        payload: filter
    })
}

export const clearFilters = fieldId => dispatch => {
    dispatch({
        type: REMOVE_FILTER_DATA,
        payload: fieldId
    })
}

export const sortData = (type, fieldId) => dispatch => {
    dispatch({
        type: SORT_DATA,
        payload: {
            type, 
            fieldId
        }
    })
}



