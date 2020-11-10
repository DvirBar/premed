import { createSelector } from 'reselect'

const constructOptions = unis => {
    return unis.map(uni => ({
        name: uni.name,
        value: uni._id
    }))
}

export const getUnisFields = (unis, calcFields) => {
    return unis.filter(uni => calcFields.find(field => 
        field.university === uni._id))
}

export const getUnisByPath = pathId => createSelector(
        state => state.unis.unis, 
        unis => unis.filter(uni => 
            uni.paths.find(path => path._id === pathId)))
