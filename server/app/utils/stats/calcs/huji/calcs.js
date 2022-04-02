import getBestAverage from "../executeCalc/getBestAverage";
import getBonus from "./bonusMap";
import getBaseAvg from "../executeCalc/getBaseAvg";
import { hujiCog } from "./hujiCog";
import { hujiFinalCalc } from "./hujiFinalCalc";
import { hujiInitial as initialStd, hujiFinal as finalStd } from './standardization'
import args from '../calcArgs';
const { psycho, mor, bagrutHuji, initialHuji, finalHuji } = args


export const hujiInitial = ({ params }) => {
    const {
        'bagrutHuji': bagrut,
        'psycho': psycho,
    } = params
    
    const stdCog = hujiCog({ bagrut, psycho })

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

    const result = hujiFinalCalc({ bagrut, psycho, mor, year})

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


export const hujiInitialArgs = {
    [psycho._id]: {
        coef: initialStd.psycho
    },
    [bagrutHuji._id]: {
        coef: initialStd.bagrut
    },
    "intercept": {
        coef: initialStd.intercept
    }
} 

export const hujiFinalArgs = {
    [psycho._id]: {
        coef: finalStd.psycho
    },
    [bagrutHuji._id]: {
        coef: finalStd.bagrut
    },
    [mor._id]: {
        coef: finalStd.mor,
        hasYear: true
    },
    "intercept": {
        coef: finalStd.intercept,
        hasYear: true
    }
}


export const hujiReverse = {
    [initialHuji._id]: [
        bagrutHuji._id, psycho._id
    ],
    [finalHuji._id]: [
        bagrutHuji._id, psycho._id, mor._id
    ]
}

