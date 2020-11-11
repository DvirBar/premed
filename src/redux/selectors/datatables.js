export const getAllTables = state => {
    return state.datatables.tables

}

export const getPriorityTable = state => {
    const tables = state.datatables.tables

    return tables.find(table => table.enabled) || tables[0]
}

export const getTableById = (state, tableId) => {
    return state.datatables.tables.find(table => table._id === tableId)
}

export const getThreshsByFieldAndType = (tables, tableId, fieldId, type) => {
    const table =  tables.find(table => 
        table._id === tableId).thresholds
    .filter(thresh => 
        thresh.threshType === type && 
        thresh.field === fieldId)

    return table.sort((a, b) => {
        return new Date(a.date) - new Date(b.date);
    })
}