import { getBestAverage } from "../methods";
import getBonus from "./bonusMap";
import { bagrut } from '../../groups/bagrut';

export const hujiFinal = (params) => {
    const {
        'bagrut': bagrut,
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

export const hujiBargut = (params, uSettings) => {
    let subjSum = 0;
    let unitsCounter = 0;
    let notRequired = {}
    
    /* Get average of required subjects and store 
        not required in an array */
    for(let subj in params) {
        const config = bagrut.find(arg => arg.id === subj).config;
        let hujiGroups

        // Get huji config group
        if(config.uniqueBagType) {
            hujiGroups = config[uSettings.bagType].huji
        }
        
        else {
            hujiGroups = config.huji
        }

        if(hujiGroups?.includes('isRequired')) {
            const {
                units,
                grade
            } = params[subj]

            subjObj = {
                values: params[subj],
                groups: hujiGroups
            }

            subjSum += (grade + getBonus(subj, subjObj)) * units
            unitsCounter += units
        }

        else {
            notRequired[subj] = {
                values: params[subj],
                groups: hujiGroups
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
