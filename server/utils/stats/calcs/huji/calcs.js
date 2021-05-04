import getBestAverage from "../executeCalc/getBestAverage";
import getBonus from "./bonusMap";
import getBaseAvg from "../executeCalc/getBaseAvg";
import { hujiCog } from "./hujiCog";
import { hujiFinalCalc } from "./hujiFinalCalc";



export const hujiInitial = ({ params }) => {
    const {
        'bagrutHuji': bagrut,
        'psycho': psycho,
    } = params

    const stdCog = hujiCog(bagrut/10, psycho)

    // Calculate reverse calcs
    return {
        value: stdCog.toFixed(3)
    }
}

export const hujiFinal = ({ params, year }) => {
    const {
        'bagrutHuji': bagrut,
        'psycho': psycho,
        'mor': mor
    } = params
    
    const cog = hujiCog(bagrut/10, psycho)

    const result = hujiFinalCalc(mor, cog, year)

    // Return result rounded to 3 decimals
    return {
        value: result.toFixed(3)
    }
}

export const hujiBargut = ({ params, values }) => {
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
