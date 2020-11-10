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