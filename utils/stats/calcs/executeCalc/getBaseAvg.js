import groups from "../../groups/dataGroups";
import getGroupConfig from "../../groups/getGroupConfig";

const getBaseAvg = (params, values, uni, getBonus, bonusConfig) => {
    let subjSum = 0;
    let unitsCounter = 0;
    let notRequired = []

    /* Get average of required subjects and store 
        not required in an array */
    for(let subj in params) {
        const group = groups.find(thisGroup => 
            thisGroup._id === subj)

        const config = getGroupConfig(values, group)
        let uniGroups = config[uni] || []
        const subjParams = params[subj]

        if(subjParams.multiVals) {
            for(let valItem in subjParams.values) {
                const paramVals = subjParams.values[valItem]
                const subjObj = addBonusToGrade(
                    getBonus,
                    paramVals, 
                    uniGroups, 
                    valItem, 
                    bonusConfig)

                notRequired.push({
                    name: valItem,
                    ...subjObj
                })
            }
        }

        else {
            const subjObj = addBonusToGrade(
                getBonus,
                subjParams, 
                uniGroups, 
                subj, 
                bonusConfig)

            if(uniGroups?.includes('isRequired')) {
                const {
                    units,
                    grade
                } = subjObj.values
    
                let unitsToAdd = units
    
                if(uni === 'tech' &&
                    subj === 'math' && units >= 4) {
                    unitsToAdd = unitsToAdd * 2  
                }
    
                subjSum += grade * unitsToAdd
                unitsCounter += unitsToAdd
            }
    
            else {
                notRequired.push({
                    name: subj,
                    ...subjObj
                })
            }
        }
    }

    // Get average of required subjects
    let baseAvg = {
        grade: subjSum / unitsCounter,
        units: unitsCounter
    }

    return {
        baseAvg,
        notRequired
    }
}


const addBonusToGrade = (
    getBonus, 
    paramVals, 
    uniGroups, 
    subj, 
    bonusConfig) => {

    const subjObj = {
        values: paramVals,
        groups: uniGroups
    }

    const grade = subjObj.values.grade
    subjObj.values.grade = grade + getBonus(subj, subjObj, bonusConfig)

    return subjObj
}

export default getBaseAvg