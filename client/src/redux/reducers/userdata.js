import {
    USER_DATA_LOADING,
    USER_DATA_LOAD_SOFT,
    USER_DATA_SUCCESS,
    USER_DATA_PATH_SUCCESS,
    USER_DATA_ERROR,
    VALID_ERROR,
    USER_DATA_ADD,
    CHANGE_TABLE,
    COPY_DATA_SIMULATION,
    INSERT_DATA_SIMULATION,
    REMOVE_SIMULATED_VALUES,
    VALID_ERROR_SIMULATED,
    ADD_SIMULATED_GROUP,
    REMOVE_SIMULATED_GROUP,
    USER_DATA_UPDATE_PATHS,
    USER_DATA_SWITCH_TABLE,
    USER_DATA_REMOVE,
    USER_DATA_TOGGLE_ENABLED,
    CLEAR_CHANGED_FIELD,
    ADD_CUSTOM_GROUP,
    USER_DATA_DELETE,
    FILTER_DATA,
    REMOVE_FILTER_DATA,
    SORT_DATA,
    USER_DATA_INSERT_SUCCESS,
    SIMULATE_CALCS_SUCCESS,
    EXEC_CALC_SUCCESS
} from '../actions/types';

const initialState = {
    loading: false,
    softLoading: false,
    tableData: [],
    data: {},
    selTable: null,
    changedField: {},
    dataRemoved: false,
    simulatedData: {
        values: [],
        customGroups: [],
        errors: []
    },
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
                data: {
                    ...payload.data,
                    errors: []
                },
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
            return {
                ...state,
                loading: false,
                simulatedData: {
                    ...state.simulatedData,
                    values: state.data.tableData.dataVals.map(dataVal =>
                        dataVal.isCalc
                        ? {
                            ...dataVal,
                            value: dataVal.suggestValue || dataVal.value
                        }
                        : dataVal),
                    customGroups: state.data.tableData.customGroups
                }
            }

        case SIMULATE_CALCS_SUCCESS: {
            let dataToUpdate = []
            let dataToInsert = []

            const values = state.simulatedData.values

            for(let item of payload) {
                if(values.find(val => 
                    item.field === val.field &&
                    val.isCalc)) {
                    dataToUpdate.push(item)
                }

                else {
                    dataToInsert.push(item)
                }
            }

            return {
                ...state,
                softLoading: false,
                simulatedData: {
                    ...state.simulatedData,
                    values: [
                        ...values.map(val => {
                            const item = dataToUpdate.find(payItem => 
                                payItem.field === val.field && val.isCalc)

                            if(item) {
                                return {
                                    ...val,
                                    value: item?.value
                                }
                            }

                            return val
                        }),
                        ...dataToInsert 
                    ]
                }
            }    
        }
            

        case INSERT_DATA_SIMULATION: 
            return {
                ...state,
                softLoading: false,
                simulatedData: {
                    ...state.simulatedData,
                    values:   
                    state.simulatedData.values.find(dataItem =>
                        dataItem.group === payload.group &&
                        dataItem.field === payload.field)
                        ?   state.simulatedData.values.map(dataItem =>
                            dataItem.group === payload.group &&
                            dataItem.field === payload.field
                            ?   {
                                    ...dataItem,
                                    value: payload.value
                                }
                            :   dataItem)
                        
                        :   [...state.simulatedData.values, payload]
                }
            }

        case REMOVE_SIMULATED_VALUES:
            return {
                ...state,
                simulatedData: {
                    ...state.simulatedData,
                    values: state.simulatedData.values.filter(val =>
                        payload.isGroup
                        ?   val.group !== payload._id
                        :   val.field !== payload._id
                    )
                }
            }

        case ADD_SIMULATED_GROUP: 
            return {
                ...state,
                simulatedData: {
                    ...state.simulatedData,
                    customGroups: [
                        ...state.simulatedData.customGroups,
                        payload
                    ]
                }
            }

        case REMOVE_SIMULATED_GROUP: 
            return {
                ...state,
                simulatedData: {
                    ...state.simulatedData,
                    customGroups: state.simulatedData.customGroups.filter(group => 
                        group._id !== payload)
                }
            }

        case VALID_ERROR: {
            return {
                ...state,
                data: {
                    ...state.data,
                    errors: payload
                }
            }
        }

        case VALID_ERROR_SIMULATED: {
            return {
                ...state,
                simulatedData: {
                    ...state.simulatedData,
                    errors: payload
                }
            }
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
                    tableData: {
                        ...state.data.tableData,
                        enabled: payload.enabled
                    }
                }
            }

        case USER_DATA_INSERT_SUCCESS: {
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

        case USER_DATA_REMOVE: {
            const payData = payload.data
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
                                state.data.tableData.dataVals.filter(val =>
                                    payData.removeAll
                                    ?   val.group !== payData.groupId
                                    :   val.group !== payData.groupId &&
                                        val.filter !== payData.fieldId
                                ),
                            customGroups: payData.cusGroupParent
                            ?   state.data.tableData.customGroups.filter(group => 
                                group._id !== payData.groupId)

                            :   state.data.tableData.customGroups
                        }
                        
                        : state.data.tableData
                },
                changedField: payload.changed,
                dataRemoved: true
            }
        }

        case EXEC_CALC_SUCCESS:
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
                changedField: {},
                dataRemoved: false
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

        case CLEAR_CHANGED_FIELD: 
            return {
                ...state,
                changedField: {},
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

        if(filter.field.type === 'str') {
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

