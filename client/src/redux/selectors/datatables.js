import { createSelector } from 'reselect'; 

export const getAllTables = state => {
    return state.datatables.tables
}

export const getInternalTables = () => createSelector(
    getAllTables,
    tables => tables.filter(table => !table.url)
)

export const getTableById = tableId => createSelector(
    getAllTables,
    tables => tables.find(table => table._id === tableId)
)

export const getPriorityTable = state => {
    const tables = state.datatables.tables

    return tables.find(table => table.enabled) || tables[0]
}

export const getThreshsByFieldAndType = 
(tableId, fieldId, type) => createSelector(
    getTableById(tableId),
    table => {
        const threshes = table.thresholds?.filter(thresh => 
            thresh.threshType === type && 
            thresh.field === fieldId)

        const sortedThreshses = threshes.sort((a, b) => {
            return new Date(a.date) - new Date(b.date);
        })

        return sortedThreshses
    }
)

  

