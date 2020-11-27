import { createSelector } from 'reselect'

export const getUnisFields = (unis, calcFields) => {
    return unis.filter(uni => calcFields.find(field => 
        field.university === uni._id))
}

export const getUnisByPath = pathId => createSelector(
        state => state.unis.unis, 
        unis => unis.filter(uni => 
            uni.paths.find(path => path._id === pathId)))

export const getUnisByPaths = pathIds => createSelector(
    state => state.unis.unis, 
    unis => unis.filter(uni => 
        uni.paths.find(path => pathIds.includes(path))))


