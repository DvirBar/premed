const { createSelector } = require("reselect")

const userdataSelector = state => state.userdata

const selectDataVals = createSelector(
    userdataSelector,
    userdata => userdata.data.tableData.dataVals
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
