import {
    USER_DATA_LOADING,
    USER_DATA_LOAD_SOFT,
    USER_DATA_SUCCESS,   
    USER_DATA_ERROR,
    VALID_ERROR,
    USER_DATA_ADD,
    CHANGE_TABLE,
    COPY_DATA_SIMULATION,
    INSERT_DATA_SIMULATION,
    REMOVE_SIMULATED_VALUES,
    ADD_SIMULATED_GROUP,
    VALID_ERROR_SIMULATED,
    REMOVE_SIMULATED_GROUP,
    USER_DATA_UPDATE_PATHS,
    USER_DATA_SWITCH_TABLE,

    USER_DATA_PATH_LOADING, 
    USER_DATA_PATH_SUCCESS, 

    USER_DATA_TABLE_LOAD_MORE_LOADING,
    USER_DATA_TABLE_LOAD_MORE_SUCCESS,

    USER_DATA_INSERT_LOADING,
    USER_DATA_INSERT_SUCCESS,
    USER_DATA_INSERT_FAILURE,

    CLEAR_CHANGED_FIELD,

    USER_DATA_REMOVE,
    USER_DATA_TOGGLE_ENABLED,
    ADD_CUSTOM_GROUP,
    USER_DATA_DELETE,
    EXEC_CALC_LOADING,
    EXEC_CALC_SUCCESS,
    EXEC_CALC_FAILURE,
    SIMULATE_CALCS_LOADING,
    SIMULATE_CALCS_SUCCESS,
    SIMULATE_CALCS_FAILURE,
    UPDATE_TABLE_FILTER_DATA
} from './types';
import axios from 'axios';
import { getMessage, getError } from './messages';
import { setLoader } from '../loader/utils';

const userdataDefaults = { 
    groupVals: [{
        field: "sector",
        group: "bagrut",
        isCalc: "false",
        isType: true,
        value: "jew"
    }]
}

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

export const removeSimulatedValues = (id, isGroup) => {
    return {
        type: REMOVE_SIMULATED_VALUES,
        payload: {
            _id: id,
            isGroup
        }
    }
}

export const addSimulatedGroup = group => {
    return {
        type: ADD_SIMULATED_GROUP,
        payload: group
    }
}

export const removeSimulatedGroup = id => {
    return {
        type: REMOVE_SIMULATED_GROUP,
        payload: id
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
export const getUsersDataByPathTable = (tableId, pathId, filters, lastId) => dispatch => {
    const isMore = lastId ? true : false

    dispatch({
        type: isMore 
            ?   USER_DATA_TABLE_LOAD_MORE_LOADING
            :   USER_DATA_PATH_LOADING
    })
    
    const data = {
        filters
    }

    if(lastId) {
        data.lastId = lastId
    }

    const body = JSON.stringify(data)

    

    axios.post(`api/userdata/${tableId}/${pathId}`, body)
         .then(res => { 
             dispatch({
                type: isMore 
                    ? USER_DATA_TABLE_LOAD_MORE_SUCCESS
                    :  USER_DATA_PATH_SUCCESS,
                payload: {
                    dataVals: res.data.data,
                    filters: filters || [],
                    finished: res.data.finished,
                    lastId: res.data.newLastId
                }
            })})
         .catch(err => {
             dispatch(dataError());
             dispatch(getError(err));
         });
}

// Create new user data collection
export const addUserData = data => dispatch => {
    const finalDataObj = {
        ...data,
        defaults: userdataDefaults
    }

    // Request body
    const body = JSON.stringify(finalDataObj);

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

// Add existing userdata to a new table
export const newUserTable = (tableId, data) => dispatch => {
    const finalDataObj = {
        ...data,
        defaults: userdataDefaults
    }

    // Request body 
    const body = JSON.stringify(finalDataObj);

    axios.post(`api/userdata/newTable/${tableId}`, body)
         .then(res => {
             dispatch({
                 type: USER_DATA_ADD,
                 payload: res.data
             })
         })
}

// Copy data from an existing table to another
export const copyData = tableId => dispatch => {
    dispatch(dataLoad());
    
    axios.post(`api/userdata/copyData/${tableId}`)
         .then(res => {
             dispatch({
                 type: USER_DATA_ADD,
                 payload: res.data
             })

             console.log(res);
             dispatch(getMessage(res.data.message))
         })
}

export const validError = errors => dispatch => {
    dispatch({
        type: VALID_ERROR,
        payload: errors
    })
}

export const validErrorSimulated = error => dispatch => {
    dispatch({
        type: VALID_ERROR_SIMULATED,
        payload: error
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
export const simulateCalcs = (
    calcsToExec, 
    values, 
    customGroups, 
    tableYear,
    tableId) => dispatch => {

    dispatch({ type: SIMULATE_CALCS_LOADING })

    // Request body
    const body = JSON.stringify({
        calcsToExec,
        values,
        customGroups,
        tableYear
    });

    axios.post(`api/userdata/simulateCalcs/${tableId}`, body)
         .then(res => {
             dispatch ({
                type: SIMULATE_CALCS_SUCCESS,
                payload: res.data
             })})
         .catch(err => {
             dispatch({ type: SIMULATE_CALCS_FAILURE })
             dispatch(getError(err))
            })
}

// Insert data to simulation vals
export const insertDataSimulation = (field, group, cusGroupParent, value) => dispatch => {
    dispatch({
        type: INSERT_DATA_SIMULATION,
        payload: {
            field,
            group,
            cusGroupParent,
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
export const insertData = (data, tableId) => dispatch => {
    const loaderInstance = setLoader(
        USER_DATA_INSERT_LOADING,
        null,
        data.fieldId,
        data.groupId)
    dispatch(loaderInstance);
    
    // Request body
    const body = JSON.stringify(data);

    axios.put(`api/userdata/insertdata/${tableId}`, body)
         .then(res => {
            loaderInstance.type = USER_DATA_INSERT_SUCCESS
            dispatch({
                ...loaderInstance,
                payload: {
                    tableId,
                    dataVal: res.data
                }
             })
         })
         .catch(err => {
                loaderInstance.type = USER_DATA_INSERT_FAILURE             
                dispatch(loaderInstance)
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
    for(let calcLevel of calcsToExec) {
        for(let calc of calcLevel) {
            const instance = setLoader(EXEC_CALC_LOADING, null, calc)
            dispatch(instance)
        }
    }
    

    const data = {
        calcsToExec: calcsToExec
    }

    const body = JSON.stringify(data)

    axios.put(`/api/userdata/execCalc`, body)
         .then(res => dispatch({
             type: EXEC_CALC_SUCCESS,
             payload: res.data
         }))
         .catch(err => {
             dispatch({ type: EXEC_CALC_FAILURE })
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

export const addCustomGroup = (data, tableId) => dispatch => {
    const body = JSON.stringify(data) 

    dispatch(dataLoadSoft())

    axios.put(`api/userdata/addCustomGroup/${tableId}`, body)
         .then(res => dispatch({
             type: ADD_CUSTOM_GROUP,
             payload: res.data
         }))
         .catch(err => {
             dispatch(dataError())
             dispatch(getError(err))
         })
}

export const removeValue = (data, tableId) => dispatch => {
    const body = JSON.stringify(data)

    dispatch(dataLoadSoft())

    axios.put(`api/userdata/removedata/${tableId}`, body)
         .then(res => {
            const changed = {
                group: data.groupId,
                cusGroupParent: data.cusGroupParent,
                field: data.fieldId
            }
            dispatch({
                type: USER_DATA_REMOVE,
                payload: {
                    tableId,
                    data,
                    changed
                }
            })

            dispatch(getMessage(res.data))
        })
        .catch(err => {
            dispatch(dataError())
            dispatch(getError(err))
        })
}

export const clearChangedField = () => dispatch => {
    dispatch({
        type: CLEAR_CHANGED_FIELD
    })
}



