import { getBestAverage } from "../methods";
import getBonus from "./bonusMap";
import groups from "../../groups/dataGroups";
import getGroupConfig from "../../groups/getGroupConfig";

export const hujiFinal = (params) => {
    const {
        'bagrutHuji': bagrut,
        'psycho': psycho,
        'mor': mor
    } = params
    
    // Standard bagrut grade
    const B = 3.9630 * (bagrut/10) - 20.0621;

    // Standard psychometry grade
    const P = 0.032073 * psycho + 0.3672;

    // Calculated cognitive grade for med school
    const ratioCog = 0.3 * B + 0.7 * P;
    const stdCog = 1.2235 * ratioCog - 4.4598;

    // Standard mor grade
    const M = 0.0247 * mor + 21.0837

    // Final grade
    const result = 0.75 * M + 0.25 * stdCog

    // Return result rounded to 3 decimals
    return {
        value: result.toFixed(3)
    }
}

export const hujiBargut = (params, values) => {
    let subjSum = 0;
    let unitsCounter = 0;
    let notRequired = {}
    
    /* Get average of required subjects and store 
        not required in an array */
    for(let subj in params) {
        const group = groups.find(thisGroup => thisGroup._id === subj)
        const config = getGroupConfig(values, group)
        let hujiGroups = config.huji || []

        if(hujiGroups?.includes('isRequired')) {
            const {
                units,
                grade
            } = params[subj]

            const subjObj = {
                values: params[subj],
                groups: hujiGroups
            }

            subjSum += (grade + getBonus(subj, subjObj)) * units
            unitsCounter += units
        }

        else {
            if(params[subj].multiVals) {
                const paramsVals = params[subj].values
                for(let param in paramsVals) {
                    notRequired[param] = {
                        values: paramsVals[param],
                        groups: hujiGroups
                    } 
                }
            }

            else {
                notRequired[subj] = {
                    values: params[subj],
                    groups: hujiGroups
                }
            }
        }
    }

    // Get average of required subjects
    let baseAvg = {
        grade: subjSum / unitsCounter,
        units: unitsCounter
    }

    let result = getBestAverage(baseAvg, notRequired, 127, 20, getBonus)

    result = {
        ...result,
        value: (result.value).toFixed(1)
    }
    return result
}
