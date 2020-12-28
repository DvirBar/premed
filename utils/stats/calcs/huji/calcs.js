import getBestAverage from "../executeCalc/getBestAverage";
import getBonus from "./bonusMap";
import getBaseAvg from "../executeCalc/getBaseAvg";

export const hujiFinal = params => {
    const {
        'bagrutHuji': bagrut,
        'psycho': psycho,
        'mor': mor
    } = params

    console.log(bagrut);
    
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
    const { 
        baseAvg,
        notRequired
    } = getBaseAvg(params, values, 'huji', getBonus)
    
    let result = getBestAverage(baseAvg, notRequired, 127, 20, getBonus)

    result = {
        ...result,
        value: (result.value).toFixed(1)
    }
    return result
}
