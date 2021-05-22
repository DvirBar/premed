import storedCalcs from "./stats/calcs/storedCalcs"
import fields from "./stats/fields/dataFields"
import baseData from '../src/staticData/baseData/baseData'


const { universities } = baseData

const getByUniAndPath = (inputs, uniId, pathId) => {
    return inputs.filter(field => 
        field.uni === uniId && 
        (!field.paths || field.paths.includes(pathId))) 
}

export const getByPaths = (arr, pathIds) => {
    return arr.filter(item => 
        !item.paths || item.paths.find(path => 
            pathIds.includes(path)))
}

export const getUnisByPath = pathId => {
    const unis = universities.filter(uni =>
        uni.paths.includes(pathId))

    return unis
} 

export const getInputsByUniAndPath = (uniId, pathId) => {
    const inputsArr = [
        ...getByUniAndPath(storedCalcs, uniId, pathId),
        ...getByUniAndPath(fields, uniId, pathId)
    ]

    return inputsArr
}