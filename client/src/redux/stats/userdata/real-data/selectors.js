const { createSelector } = require("reselect")

const userdataSelector = state => state.userdata

const selectUserTableData = createSelector(
    userdataSelector,
    userdata => userdata.data.tableData
)

export const selectTableData = createSelector(
    userdataSelector,
    userdata => userdata.tableData.dataVals
)

export const selectTableFilters = createSelector(
    userdataSelector,
    userdata => userdata.tableData.filters
)

export const selectTableDataFull = createSelector(
    userdataSelector,
    userdata => userdata.tableData
)


export const selectTableFilterByField = fieldId => createSelector(
    selectTableFilters,
    filters => filters.find(filter => filter.field === fieldId)?.value
)

const selectDataVals = createSelector(
    selectUserTableData,
    tableData => tableData.dataVals
)

export const selectRealCustomGroup = groupId => createSelector(
    selectUserTableData,
    tableData => tableData.customGroups.find(customGroup => 
        customGroup._id == groupId)
)


export const selectRealFieldValue = fieldId => createSelector(
    selectDataVals,
    dataVals => dataVals.find(dataVal => 
        dataVal.field === fieldId)
)

export const selectRealFieldValues = fieldIds => createSelector(
    selectDataVals,
    dataVals => dataVals.filter(dataVal => 
        fieldIds.includes(dataVal.field))
)


