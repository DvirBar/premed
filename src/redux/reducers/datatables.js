import {
    TABLE_LOADING,
    TABLE_SUCCESS,
    TABLE_ERROR,
    TABLE_ADD,
    TABLE_UPDATE,
    TABLE_TOGGLE_ENABLED,
    TABLE_DELETE,
    THRESHOLD_ADD,
    THRESHOLD_UPDATE,
    THRESHOLD_DELETE
} from '../actions/types';

const initialState = {
    loading: false,
    tables: []
}

export default function(state = initialState, action) {
    const payload = action.payload;

    switch(action.type) {
        case TABLE_LOADING:
            return {
                ...state,
                loading: true
            }

        case TABLE_SUCCESS: 
            return {
                ...state,
                loading: false,
                tables: payload
            }

        case TABLE_ERROR:
            return {
                ...state,
                loading: false,
            }

        case TABLE_ADD:
            return {
                ...state,
                loading: false,
                tables: [payload, ...state.tables]
            }

        case TABLE_UPDATE:
            return {
                ...state,
                loading: false,
                tables: state.tables.map(table => 
                    table._id === payload._id ? table = payload : table)
            }

        case TABLE_TOGGLE_ENABLED:
            return {
                ...state,
                loading: false,
                tables: state.tables.map(table => {
                    for(let payTable of payload) {
                        if(table._id === payTable._id) {
                            table = payTable
                            return table
                        }
                    }
                    return table
                })
            }

        case THRESHOLD_ADD:
            return {
                ...state,
                loading: false,
                tables: state.tables.map(table =>
                    table._id === payload.tableId
                    ?   {
                        ...table,
                        thresholds: [
                            ...table.thresholds.filter(thresh =>
                                !payload.thresholds.find(fieldThresh =>
                                    fieldThresh._id === thresh._id)),
                            
                            ...payload.thresholds
                        ]}
                    :   table  
                    )
            }

        case THRESHOLD_EDIT:
            return {
                ...state,
                loading: false,
                tables: state.tables.map(table =>
                    table._id === payload.tableId
                    ?   {
                        ...table,
                        thresholds: [
                            ...table.thresholds.filter(thresh =>
                                !payload.thresholds.find(fieldThresh =>
                                    fieldThresh._id === thresh._id)),
                            
                            ...payload.thresholds
                        ]}
                    :   table  
                    )
            }

        case THRESHOLD_DELETE:
            return {
                ...state,
                loading: false,
                tables: state.tables.map(table =>
                    table._id === payload.tableId
                    ?   {
                        ...table,
                        thresholds: [
                            ...table.thresholds.filter(thresh =>
                                !payload.thresholds.find(fieldThresh =>
                                    fieldThresh._id === thresh._id)),
                            
                            ...payload.thresholds
                        ]}
                    :   table  
                    )
            }

        case TABLE_DELETE:
            return {
                ...state,
                loading: false,
                tables: state.tables.filter(table => table._id !== payload)
            }

        default:
            return state;
    }
}