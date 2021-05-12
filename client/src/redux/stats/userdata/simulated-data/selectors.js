import { createSelector } from "reselect"
import { userdataSelector } from "../../../selectors/userdata"

const selectSimData = createSelector(
    userdataSelector,
    userdata => userdata.simulatedData.values
)

export const selectSimFieldValue = fieldId => createSelector(
    selectSimData,
    simData => simData.find(dataVal => 
        dataVal.field === fieldId)
)

export const selectSimFieldValues = fieldIds => createSelector(
    selectSimData,
    simData => simData.filter(dataVal => 
        fieldIds.includes(dataVal.field))
)