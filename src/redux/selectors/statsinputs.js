import { createSelector } from 'reselect'

export const statsInputsSelector = state => state.statsinputs
export const fieldsSelector = createSelector(
    statsInputsSelector,
    inputs => inputs.fields
)

export const calcsSelector = createSelector(
    statsInputsSelector,
    inputs => inputs.calcs
)

export const threshFieldsSelector = createSelector(
    fieldsSelector,
    calcsSelector,
    (fields, calcs) => {
        const filteredFields = fields.filter(field => 
            field.threshField)
        const filteredCalcs = calcs.filter(calc =>
             calc.threshField || calc.constValue)
    
        return [...filteredCalcs, ...filteredFields]    
    }
)

export const getAllStoredCalcs = state => {
    return state.statsinputs.calcs
}

export const getGroups = state => {
    return state.statsinputs.groups
}

export const getFieldById = fieldId => createSelector(
    fieldsSelector,
    fields => fields.find(field => field._id === fieldId)
)

export const getFieldsAndCalcs = state => {
    return [
        ...state.statsinputs.fields,
        ...state.statsinputs.calcs
    ]
}

export const getFieldsAndCalcsByPath = pathId => createSelector(
    fieldsSelector,
    calcsSelector,
    (fields, calcs) => {
        return [
            ...fields.filter(field => 
                !field.paths || field.paths.includes(pathId)),
            ...calcs.filter(calc => 
                !calc.paths || calc.paths.includes(pathId))
        ]
    }
)

export const getInputsByUniAndPath = (uniId, pathId) => createSelector(
    state => state.statsinputs,
    inputs => {
        return {
            ...inputs,
            fields: inputs.fields.filter(field => 
                field.uni === uniId && (!pathId || field.paths.includes(pathId))),
            groups: inputs.groups.filter(group => 
                group.uni === uniId && (!pathId || group.paths.includes(pathId))),
            calcs: inputs.calcs.filter(calc => 
                calc.uni === uniId && (!pathId || calc.paths.includes(pathId)))
        }
    }
)

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

export const getInputsByArgs = chosenCalcs => createSelector(
    state => state.statsinputs.fields,
    state => state.statsinputs.groups,
    state => state.statsinputs.calcs,
    (fields, groups, calcs) => {
        const fieldsArr = fields?.filter(field => chosenCalcs.find(calc =>
            calc.args.find(arg => 
                arg.type === 'field' && arg._id === field._id)))

        let groupsArr = groups?.filter(group => chosenCalcs.find(calc =>
            calc.args.find(arg =>
                 arg.type === 'group' && arg._id === group._id)))

        let parents = groups.filter(group => {
            for(let groupItem of groupsArr) {
                if(groupItem.parent === group._id)
                    return true

                return false
            }
        })

        groupsArr.push.apply(groupsArr, parents)

        const calcsArr = calcs?.filter(calc => 
            !chosenCalcs.find(chosenCalc => 
                chosenCalc._id === calc._id) &&
            chosenCalcs.find(chosenCalc =>
            chosenCalc.args.find(arg => 
                arg.type === 'calc' && arg._id === calc._id)))

        
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

export const getTableSectionsByPath = pathId => createSelector(
    statsInputsSelector,
    inputs => inputs.tableSections[pathId]
)

export const getCalcsByUniAndPath = (pathId, uniId) => createSelector(
    threshFieldsSelector,
    fields => fields.filter(field => {
        if(field.threshField?.paths) {
            const threshField = field.threshField

            return threshField.paths.includes(pathId) && 
                   threshField.unis.includes(uniId)
        }

        return field.uni === uniId && 
        (!field.paths || field.paths.includes(pathId))
    })
)