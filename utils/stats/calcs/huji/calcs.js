import getBestAverage from "../executeCalc/getBestAverage";
import getBonus from "./bonusMap";
import getBaseAvg from "../executeCalc/getBaseAvg";

const hujiCog = (bagrut, psycho) => {
    // Standard bagrut grade
    const B = 3.9630 * (bagrut/10) - 20.0621;

    // Standard psychometry grade
    const P = 0.032073 * psycho + 0.3672;

    // Calculated cognitive grade for med school
    const ratioCog = 0.3 * B + 0.7 * P;
    const stdCog = 1.2235 * ratioCog - 4.4598;

    return stdCog
}

export const hujiInitial = params => {
    const {
        'bagrutHuji': bagrut,
        'psycho': psycho,
    } = params

    const stdCog = hujiCog(bagrut, psycho)
     
    return {
        value: stdCog.toFixed(3)
    }
}

export const hujiFinal = params => {
    const {
        'bagrutHuji': bagrut,
        'psycho': psycho,
        'mor': mor
    } = params
    
    const stdCog = hujiCog(bagrut, psycho)

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
    const { 
        baseAvg,
        notRequired,
        addedArgs
    } = getBaseAvg(params, values, 'huji', getBonus)
    
    let {
        value,
        payload
    } = getBestAverage(baseAvg, notRequired, 127, 20, addedArgs)

    const result = {
        payload: {
            ...payload,
            addedArgs
        },
        value: (value).toFixed(1)
    }
    return result
}
