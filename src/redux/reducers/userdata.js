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
    ADD_CUSTOM_GROUP,
    USER_DATA_DELETE,
    FILTER_DATA,
    REMOVE_FILTER_DATA,
    SORT_DATA
} from '../actions/types';

const initialState = {
    loading: false,
    softLoading: false,
    tableData: [],
    data: {},
    selTable: null,
    changedField: {},
    simulatedData: [],
    ordering: {
        filters: [],
        sort: {
            type: null,
            fieldId: null
        }
    }
}

export default function(state = initialState, action) {
    const payload = action.payload;

    switch(action.type) {
        case USER_DATA_LOADING:
            return {
                ...state,
                loading: true
            }

        case USER_DATA_LOAD_SOFT:
            return {
                ...state,
                softLoading: true
            }

        case USER_DATA_ADD:
        case USER_DATA_SUCCESS: 
            return {
                ...state,
                loading: false,
                data: payload.data,
                selTable: payload.selTable
            }

        case USER_DATA_ERROR:
            return {
                ...state,
                loading: false,
                softLoading: false
            }

        case CHANGE_TABLE:
            return {
                ...state,
                loading: false,
                selTable: payload
            }
 
        case COPY_DATA_SIMULATION: {
            const table = state.data.tables.find(thisTable => 
                thisTable.table._id === state.selTable)
            return {
                ...state,
                loading: false,
                simulatedData: table.dataVals.filter(val => 
                    payload.fields.find(field =>
                        field._id === val.field._id))
            }
        }

        case SIMULATE_CALCS: 
            return {
                ...state,
                softLoading: false,
                simulatedData: [
                    ...state.simulatedData.filter(dataItem =>
                        !payload.find(item =>
                            item.field._id === dataItem.field._id)),
                    
                    ...payload.map(item => ({
                        field: item.field,
                        value: (item.result).toString()
                    }))
                ]
            }    

        case INSERT_DATA_SIMULATION: 
            return {
                ...state,
                softLoading: false,
                simulatedData:
                state.simulatedData.find(dataItem => 
                    dataItem.field._id === payload.field._id)
                ?   state.simulatedData.map(dataItem =>
                    dataItem.field._id === payload.field._id
                    ?   {
                            ...dataItem,
                            value: payload.value
                        }
                    :   dataItem)
                
                :   [...state.simulatedData, payload]
            }

        case USER_DATA_PATH_SUCCESS:
            return {
                ...state,
                loading: false,
                tableData: payload
            }

        case USER_DATA_UPDATE_PATHS:
            return {
                ...state,
                loading: false,
                data: {
                    ...state.data,
                    tableData: state.data.tableData.table._id === payload.tableId &&
                        {
                            ...state.data.tableData,
                            paths: payload.paths
                        }
                }
            }

        case USER_DATA_SWITCH_TABLE: 
            return {
                ...state, 
                loading: false,
                data: {
                    ...state.data,
                    transfer_suggested: false,
                    tables: [...state.data.tables, payload]
                }
            }

        case USER_DATA_TOGGLE_ENABLED:
            return {
                ...state,
                softLoading: false,
                data: {
                    ...state.data,
                    enabled: payload.enabled
                }
            }

        case USER_DATA_INSERT: {
            const dataVals = state.data.tableData.dataVals
            return {
                ...state,
                softLoading: false,
                data: {
                    ...state.data,
                    tableData:
                        state.selTable === payload.tableId
                        ? {
                            ...state.data.tableData,
                            last_updated: new Date(Date.now()),
                            dataVals: 
                                dataVals.length === 0
                                ?  [payload.dataVal]

                                : (dataVals.find(value => 
                                    value.field === payload.dataVal.field &&
                                    value.group === payload.dataVal.group) 

                                    ? dataVals.map(value => 
                                        value.field === payload.dataVal.field &&
                                        value.group === payload.dataVal.group
                                        
                                        ? payload.dataVal : value)
                                    
                                    : [...dataVals, payload.dataVal])
                            }

                        : state.data.tableData
                },
                changedField: payload.dataVal
            }
        }

        case EXEC_CALC:
            let dataToInsert = []
            let dataToUpdate = []
            const dataVals = state.data.tableData.dataVals

            if(dataVals.length > 0) {
                for(let item of payload) {
                    if(dataVals.find(dataVal =>
                        dataVal.isCalc && 
                        dataVal.field === item.field))
                        dataToUpdate.push(item)
                    
                    else {
                        dataToInsert.push(item)
                    }
                }
            }
            

            return {
                ...state,
                softLoading: false,
                data: {
                    ...state.data,
                    tableData:
                        {
                            ...state.data.tableData,
                            last_updated: new Date(Date.now()),
                            dataVals: 
                                dataVals.length === 0
                                ?  [payload]

                                : 
                                [...dataVals.map(dataVal => {
                                    const uptItem = dataToUpdate.find(payItem => 
                                        dataVal.isCalc &&
                                        payItem.field === dataVal.field)

                                    if(uptItem)
                                        return uptItem
                                    
                                    return dataVal
                                }), ...dataToInsert]
                        }
                        
                },
                changedField: undefined
            }
        
        case ADD_CUSTOM_GROUP: 
            console.log(payload);
            return {
                ...state,
                softLoading: false,
                data: {
                    ...state.data,
                    tableData: {
                        ...state.data.tableData,
                        last_updated: new Date(Date.now()),
                        customGroups: payload
                    }
                }
            }

        case FILTER_DATA: { // Use brackets to define scope
            const filters = state.ordering.filters
            return {
                ...state,
                ordering: {
                    ...state.ordering,
                    filters: filters.find(filter => 
                        filter.field.id === payload.field.id)  
                        ?   filters.map(filter =>
                            filter.field.id === payload.field.id 
                            ? filter = payload : filter)

                        :   [...filters, payload]
                }
            }
        }

        // Remove filters from table
        case REMOVE_FILTER_DATA: { // Use brackets to define scope
            const filters = state.ordering.filters
            return {
                ...state,
                ordering: {
                    ...state.ordering,
                    filters: payload ? filters.filter(filter =>
                        filter.field.id !== payload) : []
                }
            }
        }

        case SORT_DATA:
            return {
                ...state,
                ordering: {
                    ...state.ordering,
                    sort: payload
                }
            }

        case USER_DATA_DELETE:
            return {
                ...state,
                loading: false,
                data: state.data.filter(data => data.user !== payload)
            }

        default:
            return state;
    }
}

export const filterData = (state, ordering) => {
    let filteredData = state

    ordering.filters.map(filter => {
        const fieldId = filter.field.id

        if(filter.field.type === 'num') {
            const min = Number(filter.min);
            const max = Number(filter.max);

            if(min && max) {
                filteredData = filteredData.filter(data => 
                    data.dataVals.find(val =>
                        val.field === fieldId && val.value > min && val.value < max))
            }
        
            else if (!min && max) {
                filteredData = filteredData.filter(data => 
                    data.dataVals.find(val =>
                        val.field === fieldId && val.value < max))
            }
        
            else if (min && !max) {
                filteredData = filteredData.filter(data => 
                    data.dataVals.find(val =>
                        val.field === fieldId && val.value > min))
            }
        }

        if(filter.type === 'str') {
            filteredData = filteredData.filter(data => 
                data.dataVals.find(val => 
                    val.field === fieldId && val.value === filter.text))
        }
    })

    return filteredData;
}


export const sortData = (state, ordering) => {
    const fieldId = ordering.sort.fieldId

    switch(ordering.sort.type) {
        case 'ascending': {
            // Save and filter undefined values
            let missingVals = state.filter(entry => 
                !entry.dataVals.find(val => val.field === fieldId))

            // Sort numeric values
            let sortedArr = state
                   .filter(entry => entry.dataVals.find(val => 
                    val.field === fieldId))
                   .sort((a, b) => {
                        return (
                            (a.dataVals.find(val => 
                                val.field === fieldId).value)  -
                            (b.dataVals.find(val => 
                                val.field === fieldId).value)
                    ) 
                 })
                 
            // Merge sorted array and undefined values array
            Array.prototype.push.apply(sortedArr, missingVals)
            return sortedArr
        }

        case 'descending': {
              // Save and filter undefined values
              let missingVals = state.filter(entry => 
                !entry.dataVals.find(val => val.field === fieldId))

            // Sort numeric values
            let sortedArr = state
                .filter(entry => entry.dataVals.find(val => val.field === fieldId))
                .sort((a, b) => {
                    return (
                        (b.dataVals.find(val => val.field === fieldId).value) -
                        (a.dataVals.find(val => val.field === fieldId).value)
                    ) 
                })

            // Merge sorted array and undefined values array
            Array.prototype.push.apply(sortedArr, missingVals)
            return sortedArr
        }
        
        default: 
            return state
    }
}

