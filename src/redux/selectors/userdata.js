import { createSelector } from 'reselect';

export const selTableSelector = state => state.userdata.selTable

export const getDataVals = state => 
    state.userdata.data.tableData.dataVals

export const getSimulatedVals = state => 
    state.userdata.simulatedData.values

export const getCustomGroupsReal = state => 
    state.userdata.data.tableData.customGroups

export const getCustomGroupsSimulated = state => 
    state.userdata.simulatedData.customGroups

export const getFieldValReal = (fieldId, groupId) => createSelector(
    state => state.userdata.data.tableData.dataVals,
    vals => {
        if(groupId) {
            return vals.find(val => 
                val.group === groupId && 
                val.field === fieldId)
        }

        return vals.find(val => 
            val.field === fieldId)
    }
)

export const getFieldValSimulated = (fieldId, groupId) => createSelector(
    state => state.userdata.simulatedData.values,
    vals => {
        if(groupId) {
            return vals.find(val => 
                val.group === groupId && 
                val.field === fieldId)
        }

        return vals.find(val => 
            val.field === fieldId)
    }
)

export const getGroupValsReal = groupId => createSelector(
    state => state.userdata.data.tableData.dataVals,
    vals => vals.filter(val => val.group === groupId)
)

export const getGroupValsSimulated = groupId => createSelector(
    state => state.userdata.simulatedData.values,
    vals => vals.filter(val => val.group === groupId)
)

export const getGroupsValsReal = createSelector(
    state => state.userdata.data.tableData.dataVals,
    vals => vals.filter(val => val.group)
)

export const getGroupsValsSimulated = createSelector(
    state => state.userdata.simulatedData.values,
    vals => vals.filter(val => val.group)
)

export const getSelTypes = createSelector(
    state => state.userdata.data.tableData.dataVals,
    vals => vals.filter(val => val.isType)
)
