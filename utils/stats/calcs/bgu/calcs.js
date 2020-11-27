import { bagrut } from '../../groups/bagrut';
import getBonus from './bonusMap';
import { getBestAverage } from "../methods";

export const bguBargut = (params, uSettings) => {
    let subjSum = 0;
    let unitsCounter = 0;
    let notRequired = {}
    
    /* Get average of required subjects and store 
        not required in an array */
    for(let subj in params) {
        const config = bagrut.find(arg => arg.varName === subj).config;
        let bguGroups

        // Get huji config group
        if(config.uniqueBagType) {
            bguGroups = config[uSettings.bagType].bgu
        }
        
        else {
            bguGroups = config.bgu
        }

        if(tauGroups?.includes('isRequired')) {
            const {
                units,
                grade
            } = params[subj]

            subjObj = {
                values: params[subj],
                groups: bguGroups
            }

            subjSum += (grade + getBonus(subj, subjObj)) * units
            unitsCounter += units 
        }

        else {
            notRequired[subj] = {
                values: params[subj],
                groups: tauGroups
            }
        }
    }

    // Get average of required subjects
    let baseAvg = {
        grade: subjSum / unitsCounter,
        units: unitsCounter
    }

    let result = getBestAverage(baseAvg, notRequired, 135, 20, getBonus)
    result = {
        ...result,
        value: (result.value).toFixed(2)
    }
    return result
}