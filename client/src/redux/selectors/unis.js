import { createSelector } from 'reselect'

export const unisSelector = state => state.unis.unis

export const getUnisFields = (unis, calcFields) => {
    return unis.filter(uni => calcFields.find(field => 
        field.university === uni._id))
}

export const getUnisByInputs = (fields, groups, calcs) => createSelector(
    state => state.unis.unis,
    unis => unis.filter(uni => {
        if(fields?.find(field => field.uni === uni._id))
            return true

        if(groups?.find(group => group.uni === uni._id))
            return true

        if(calcs?.find(calc => calc.uni === uni._id))
            return true

        return false
    }))

export const getUnisByPath = pathId => createSelector(
        state => state.unis.unis, 
        unis => unis.filter(uni => 
            uni.paths.includes(pathId)))

export const getUnisByPaths = pathIds => createSelector(
    state => state.unis.unis, 
    unis => unis.filter(uni => 
        uni.paths.find(path => pathIds.includes(path))))

export const getUnisByCalcs = calcs => createSelector(
    state => state.unis.unis,
    unis => unis.filter(uni =>
        calcs.find(calc => calc.uni === uni._id))
)

export const getUniById = uniId => createSelector(
    state => state.unis.unis,
    unis => unis.find(uni => uni._id === uniId)
)


