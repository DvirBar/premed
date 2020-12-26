import { createSelector } from 'reselect'
import { getFieldsByArgs } from './datafields'

export const statsInputsSelector = state => state.statsinputs

export const getAllStoredCalcs = state => {
    return state.statsinputs.calcs
}

export const getGroups = state => {
    return state.statsinputs.groups
}

export const getFieldsAndCalcs = state => {
    return [
        ...state.statsinputs.fields,
        ...state.statsinputs.calcs
    ]
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

export const getInputsByArgs = (chosenCalcs) => createSelector(
    state => state.statsinputs.fields,
    state => state.statsinputs.groups,
    state => state.statsinputs.calcs,
    (fields, groups, calcs) => {
        const fieldsArr = fields?.filter(field => chosenCalcs.find(calc =>
            calc.args.find(arg => 
                arg.type === 'field' && arg._id === field._id)))

        const groupsArr = groups?.filter(group => chosenCalcs.find(calc =>
            calc.args.find(arg => !group.parent ||
                arg.type === 'group' && arg._id === group._id)))

        const calcsArr = calcs?.filter(calc => chosenCalcs.find(chosenCalc =>
            chosenCalc.args.find(arg => 
                arg.type === 'calc' && arg._id === calc._id
                && chosenCalc._id !== calc._id)))

        
        return {
            fields: fieldsArr,
            groups: groupsArr,
            calcs: calcsArr
        }
    }
)

export const getCalcWithGroupArgs = createSelector(
    state => state.statsinputs.calcs,
    calcs => calcs.filter(calc => calc.args.find(arg => 
        arg.type === 'group'))
)
