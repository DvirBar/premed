export const { createSelector } = require("reselect")

export const dataTablesSelector = state => state.datatables.tables

export const selectTableByYear = year => createSelector(
    dataTablesSelector, 
    tables => tables.find(table => table.year === year)
)

export const selectTableById = tableId => createSelector(
    dataTablesSelector,
    tables => tables.find(table => table._id === tableId)
)

export const selectTableYear = tableId => createSelector(
    selectTableById(tableId),
    table => table.year
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

export const selectCalcThresholds = (year, fieldId, type) => createSelector(
    selectThresholdsByYear(year),
    thresholds => thresholds.filter(threshold => 
        threshold.field === fieldId &&
        threshold.threshType === type)
)

export const selectLastThreshold = (year, fieldId, type) => createSelector(
    selectCalcThresholds(year, fieldId, type),
    thresholds => thresholds[thresholds.length - 1]
)