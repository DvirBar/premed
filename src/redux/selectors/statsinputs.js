import { createSelector } from 'reselect'

export const statsInputsSelector = state => state.statsinputs

export const getAllStoredCalcs = state => {
    return state.statsinputs.calcs
}

export const getGroups = state => {
    return state.statsinputs.groups
}

export const getInputsByUni = uniId => createSelector(
    state => state.statsinputs,
    inputs => {
        return {
            ...inputs,
            fields: inputs.fields.filter(field => field.uni === uniId),
            groups: inputs.groups.filter(group => group.uni === uniId),
            calcs: inputs.calcs.filter(calc => calc.uni === uniId)
        }
    }
)


export const getGroupById = groupId => createSelector(
    state => state.statsinputs.groups,
    groups => groups.find(group => group._id === groupId)
)

