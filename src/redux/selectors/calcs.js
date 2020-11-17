export const getAllStoredCalcs = state => {
    return state.calcs.storedCalcs
}

export const getCalcsByFields = (calcs, fields) => {
    return calcs.filter(calc => 
        fields.find(field => 
            field.calcOutput.storedCalc === calc.id))
} 

export const getAssignedCalcs = (calcs, fields) => {
    return calcs.filter(calc => fields.find(field => 
        field.calcOutput &&
        field.calcOutput.storedCalc === calc.id))
}
