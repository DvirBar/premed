/*
 * 
 * If a grade is greater than average grade, it will increase 
 * average. This method sorts grades decremently, and if the are  
 * greated than the cumulative avg, it adds them. Otherwise, the
 * arg will be added as an omitted argument.
 * (It also adds grades that are equal to average)
 *  
 * */

const getBestAverage = (
    baseAvg, 
    notRequired, 
    maxGrade, 
    minUnits) => {
    let cumulAvg = baseAvg;
    const cumAvg = cumulAvg.grade
    const units = cumulAvg.units

    const args = sortByGrades(notRequired)

    let counter = 0
    
    /* Keep adding values to average as long as the grade is
    greater than or equal to cumulative average, or units are
    lower than minimum units specified */
    while(counter < args.length && 
        args[counter].values.grade >= cumulAvg.grade || 
        units < minUnits) {
        cumulAvg.grade = addToAvg(cumulAvg, args[counter].values)
        cumulAvg.units = units + args[counter].values.units

        counter ++
    }

    const ommittedArgs = args.slice(counter).map(arg => arg.name)

    /* If grade has reached maximum grade and 
        minimum units requirement has been satisfied */
    const isMax = cumAvg >= maxGrade && units >= minUnit

    console.log(cumulAvg.grade);

    return {
        value: isMax ? maxGrade : cumulAvg.grade,
        payload: {
            units,
            ommittedArgs
        }
    }
}


// This function adds a value to an average
const addToAvg = (baseAvg, newArg) => {
    return (
        baseAvg.grade * baseAvg.units + 
        newArg.grade * newArg.units) /
    (baseAvg.units + newArg.units)
}

/* This function sorts arguments by their grades 
    in a descending order */
const sortByGrades = args => {
    return args.sort(function(argA, argB) {
        const valB = argB.values.grade
        const valA = argA.values.grade

        return valB - valA 
    })
}

export default getBestAverage