import { createSelector } from "reselect"
import { userdataSelector } from "../../../selectors/userdata"

const selectSimulatedData = createSelector(
    userdataSelector,
    userdata => userdata.simulatedData
)

const selectSimData = createSelector(
    selectSimulatedData,
    simulatedData => simulatedData.values
)

export const selectSimCustomGroup = groupId => createSelector(
    selectSimulatedData,
    simulatedData =>  simulatedData.customGroups.find(customGroup =>
        customGroup._id === groupId)
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