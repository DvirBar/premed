import { getBestAverage } from "../storedCalcs/methods";
import getBonus from "./bonusMap";

export const hujiFinal = params => {
    const {
        'bagrut': bagrut,
        'psycho': psycho,
        'mor': mor
    } = params

    console.log(bagrut);
    
    // Standard bagrut grade
    const B = 3.9630 * bagrut - 20.0621;

    // Standard psychometry grade
    const P = 0.032073 * psycho + 0.3672;

    // Calculated cognitive grade for med school
    const X = 0.3 * B + 0.7 * P;
    const Y = 1.2235 * X - 4.4598;

    // Standard mor grade
    const M = 0.0247 * mor + 21.0837

    // Final grade
    const S = 0.75 * M + 0.25 * Y

    // Return result rounded to 3 decimals
    return {
        value: S.toFixed(3)
    }
}

export const hujiBargut = params => {
    let subjSum = 0;
    let unitsCounter = 0;
    let notRequired = {}

    /* Get average of required subjects and store 
        not required in an array */
    for(let subj in params) {
        if(requiredSubj.includes(subj)) {
            const {
                units,
                grade
            } = params[subj]
            subjSum += (grade + getBonus(subj, params[subj])) * units
            unitsCounter += units 
        }

        else {
            notRequired[subj] = params[subj]
        }
    }

    // Get average of required subjects
    let baseAvg = {
        grade: subjSum / unitsCounter,
        units: unitsCounter
    }

    let result = getBestAverage(baseAvg, notRequired, 127, 20)
    result = {
        ...result,
        value: (result.value/10).toFixed(2)
    }
    return result
}

const requiredSubj = [
    'math',
    'eng',
    'history',
    'civics',
    'heb'
]