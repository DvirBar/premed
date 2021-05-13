const { createSelector } = require("reselect")

const userdataSelector = state => state.userdata

const selectTableData = createSelector(
    userdataSelector,
    userdata => userdata.data.tableData
)

const selectDataVals = createSelector(
    selectTableData,
    tableData => tableData.dataVals
)

export const selectRealCustomGroup = groupId => createSelector(
    selectTableData,
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
