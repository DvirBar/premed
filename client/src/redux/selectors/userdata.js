import { createSelector } from 'reselect';

export const userdataSelector = state => state.userdata

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
        return vals.find(val => 
            val.group === groupId && 
            val.field === fieldId)
        // return vals.find(val => 
        //     val.field === fieldId)
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

const getErrorByCalc = (errors, calcId) => {
    if(errors.length === 0)
        return undefined

    return errors.find(err => 
        err.calc === calcId)
}

export const getRealErrorByCalc = calcId => createSelector(
    state => state.userdata.data.errors,
    errors =>  getErrorByCalc(errors, calcId)
)

export const getSimErrorByCalc = calcId => createSelector(
    state => state.userdata.simulatedData.errors,
    errors => getErrorByCalc(errors, calcId)
)

export const getRealValidErrors = state => 
    state.userdata.data.errors

export const getSimValidErrors = state => 
    state.userdata.simulatedData.errors


export const orderingSelector = createSelector(
    userdataSelector,
    userdata => userdata.ordering
)

export const getFieldFilters = fieldId => createSelector(
    orderingSelector,
    ordering => ordering.filters.find(filter =>
        filter.field.id === fieldId)
)

export const getSort = (fieldId) => createSelector(
    orderingSelector,
    ordering => {
        const sort = ordering.sort

        if(sort.fieldId === fieldId)
            return sort.type

        return ''
    } 
)

export const getTableYear = createSelector(
    userdataSelector,
    userdata => userdata.data.tableData.table.year
)

export const hasCalcForYear = (calcVersions, gap) => createSelector(
    getTableYear,
    tableYear => !calcVersions || calcVersions.years.includes(tableYear + gap)
) 
