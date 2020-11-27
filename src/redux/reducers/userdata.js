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
 
        case COPY_DATA_SIMULATION: 
            const table = state.data.tables.find(thisTable => 
                thisTable.table._id === state.selTable)
            console.log(state.selTable);
            return {
                ...state,
                loading: false,
                simulatedData: table.dataVals.filter(val => 
                    payload.fields.find(field =>
                        field._id === val.field._id))
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

        case USER_DATA_ADD:
            return {
                ...state,
                loading: false,
                data: payload
            }

        case USER_DATA_UPDATE_PATHS:
            console.log(payload);
            return {
                ...state,
                loading: false,
                data: {
                    ...state.data,
                    tables: state.data.tables.map(table => 
                                table.table._id === payload.table._id
                                ? table = {
                                    ...table,
                                    table: payload.table,
                                    paths: payload.paths
                                } 
                                : table)
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

        case USER_DATA_INSERT:
            return {
                ...state,
                softLoading: false,
                data: {
                    ...state.data,
                    tables:
                        state.data.tables.map(table => 
                            table.table.enabled 
                        ? {
                            ...table,
                            last_updated: new Date(Date.now()),
                            dataVals: 
                                table.dataVals.length === 0
                                ?  table.dataVals = [payload]

                                : (table.dataVals.find(value => 
                                    value.field._id === payload.field._id) 

                                    ? table.dataVals.map(value => 
                                        value.field._id === payload.field._id ? 
                                        payload : value)
                                    
                                    : [...table.dataVals, payload])
                            }

                        : table
                        )
                },
                changedField: payload
            }

        case EXEC_CALC:
            let dataToInsert = []
            let dataToUpdate = []
            const dataVals = state.data.tables.find(table =>
                table.enabled).dataVals

            if(dataVals.length > 0) {
                for(let item of payload) {
                    if(dataVals.find(dataVal => 
                        dataVal.field._id === item.field._id))
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
                    tables:
                        state.data.tables.map(table => 
                            table.table.enabled 
                        ? {
                            ...table,
                            last_updated: new Date(Date.now()),
                            dataVals: 
                                table.dataVals.length === 0
                                ?  table.dataVals = [payload]

                                : 
                                [...table.dataVals.map(dataVal => {
                                    const uptItem = dataToUpdate.find(payItem => 
                                        payItem.field._id === dataVal.field._id)

                                    if(uptItem)
                                        return uptItem

                                    return dataVal
                                }), ...dataToInsert]
                            }

                        : table
                        )
                },
                changedField: undefined
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

            console.log(filteredData);

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

