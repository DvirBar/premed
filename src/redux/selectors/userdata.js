import { createSelector } from 'reselect';


export const getFieldVal = (fieldId, groupId, calcId) => createSelector(
    state => state.userdata.data.tableData.dataVals,
    vals => {
        if(groupId) {
            return vals.find(val => 
                val.group === groupId && 
                val.field === fieldId)
        }

        if(calcId) {
            return vals.find(val =>
                val.calc === calcId)
        }

        return vals.find(val => 
            val.field === fieldId)
    }
)