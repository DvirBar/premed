export const { createSelector } = require("reselect")

export const dataTablesSelector = state => state.datatables.tables

export const selectTableByYear = year => createSelector(
    dataTablesSelector, 
    tables => tables.find(table => table.year === year)
)

export const selectThresholdsByYear = year => createSelector(
    selectTableByYear(year),
    table => table?.thresholds

)

export const selectMarginThresholds = (year, fieldId, type) => createSelector(
    selectThresholdsByYear(year),
    threshes => threshes?.filter(thresh => 
        thresh.field === fieldId &&
        thresh.threshType === type &&
        (thresh.isInitial || thresh.isFinal))
)