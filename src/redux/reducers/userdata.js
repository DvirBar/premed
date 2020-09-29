import {
    USER_DATA_LOADING,
    USER_DATA_LOAD_SOFT,
    USER_DATA_SUCCESS,
    USER_DATA_PATH_SUCCESS,
    USER_DATA_ERROR,
    USER_DATA_ADD,
    USER_DATA_UPDATE_PATHS,
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
    pathData: [],
    data: {},
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
                data: payload
            }

        case USER_DATA_PATH_SUCCESS:
            return {
                ...state,
                loading: false,
                pathData: payload
            }

        case USER_DATA_ERROR:
            return {
                ...state,
                loading: false,
            }

        case USER_DATA_ADD:
            return {
                ...state,
                loading: false,
                data: payload
            }

        case USER_DATA_UPDATE_PATHS:
            return {
                ...state,
                loading: false,
                data: payload
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
        case EXEC_CALC:
            return {
                ...state,
                softLoading: false,
                data: {
                    ...state.data,
                    dataVals: 
                        state.data.dataVals.length === 0
                        ?  state.data.dataVals = [payload]

                        : (state.data.dataVals.find(value => 
                            value.field._id === payload.field._id) 

                            ? state.data.dataVals.map(value => 
                                value.field._id === payload.field._id ? 
                                payload : value)
                            
                            : [...state.data.dataVals, payload])
                }
            }

        case FILTER_DATA: {
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
        case REMOVE_FILTER_DATA: {
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
        case 'ascending':
            return state.sort((a, b) => {
                return (
                    (a.dataVals.find(val => val.field === fieldId)?.value || 0)  -
                    (b.dataVals.find(val => val.field === fieldId)?.value || 0)
                ) 
            })

        case 'descending':
            return state.sort((a, b) => {
                return (
                    (b.dataVals.find(val => val.field === fieldId)?.value || 0) -
                    (a.dataVals.find(val => val.field === fieldId)?.value || 0)
                ) 
            })
        
        default: 
            return state
    }
}

