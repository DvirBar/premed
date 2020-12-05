import { createSelector } from 'reselect';

export const selTableSelector = state => state.userdata.selTable

export const getDataVals = state => state.userdata.data.tableData.dataVals

export const getFieldVal = (fieldId, groupId) => createSelector(
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

export const getGroupVals = groupId => createSelector(
    state => state.userdata.data.tableData.dataVals,
    vals => vals.filter(val => val.group === groupId)
)

// export const getGroupsVals = state => 
//     state.userdata.data.tableData.dataVals.filter(val => val.group)


export const getGroupsVals = createSelector(
    state => state.userdata.data.tableData.dataVals,
    vals => vals.filter(val => val.group)
)