export const getBestAverage = (baseAvg, argsObj, maxGrade, minUnits, getBonus, config) => {
    let cumulAvg = baseAvg;
    let omittedArgs = [];

    /* If a grade is greater than average grade, it will increase average.
        This loop finds grades that increase base average and adds them 
        to the average. (It also adds grades that are equal to average) */
    for(let argName in argsObj) {
        const cumAvg = cumulAvg.grade
        const units = cumulAvg.units

        /* If grade has reached maximum grade and 
          minimum units requirement has been satisfied */
        if(cumAvg >= maxGrade && units >= minUnits) {
            return {
                value: maxGrade,
                payload: {
                    units,
                    ommittedArgs: omittedArgs.map(arg => arg.name)
                }
            }
        }

        // Calculate argument grade with bonus
        let newArg = {
            ...argsObj[argName],
            values: {
                ...argsObj[argName].values,
                grade: argsObj[argName].values.grade + getBonus(argName, argsObj[argName], config)
            }   
        }


        /* If argument average is greater than or equal to 
            cumulative average, add it */
        if(newArg.values.grade >= cumAvg) {
            cumulAvg = {
                grade: addToAvg(cumulAvg, newArg.values),
                units: units + newArg.values.units
            }
        }

        else {
            omittedArgs.push({
                ...newArg,
                name: argName
            })
        }

    }

    // if units number is still less than minimum
    if(cumulAvg.units < minUnits) {
        // Sort grades with bonuses of omitted args in descending order
        omittedArgs = omittedArgs.map(arg => ({
            ...arg,
            values: {
                ...arg.values,
                grade: arg.grade + getBonus(arg.name, arg, config)
            }
        }))

        omittedArgs.sort((a, b) => {
            return b.values.grade - a.values.grade
        })

        /* Start add averages to the cumulative average until minimum
             units requirement is satisfied */
        for(let newArg of omittedArgs) {
            cumulAvg = {
                grade: addToAvg(cumulAvg, newArg.values),
                units: cumulAvg.units + newArg.values.units 
            }

            /* If grade has been added to average, 
                remove it from omitted args */
            omittedArgs = omittedArgs.filter(arg => 
                arg.name === newArg.name)

            // If units has reached minmum units, break loop
            if(cumulAvg.units >= minUnits) {
                break;
            }
        }
    }

    return {
        value: cumulAvg.grade,
        payload: {
            units: cumulAvg.units,
            ommittedArgs: omittedArgs.map(arg => arg.name)
        }
    }
}


// A function that adds a value to an average
const addToAvg = (baseAvg, newArg) => {
    return (baseAvg.grade * baseAvg.units + newArg.grade * newArg.units) /
    (baseAvg.units + newArg.units)
}