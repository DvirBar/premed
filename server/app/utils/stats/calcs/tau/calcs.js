import getBonus from './bonusMap';
import getBestAverage  from "../executeCalc/getBestAverage";
import getBaseAvg from '../executeCalc/getBaseAvg';
import { tauInitialMain } from './tauInitial';
import { tauFinalCalc } from './tauFinal';
import { tauInitial as initialStd, tauFinal as finalStd } from './standardization'
import args from '../calcArgs';
const { psycho, mor, bagrutTau, initialTau, finalTau } = args

export const tauInitial = async({ params, year }) => {
    const {
        'bagrutTau': bagrut,
        'psycho': psycho,
    } = params

    const grade = await tauInitialMain({ bagrut, psycho, year })

    return {
        value: (grade).toFixed(2)
    }
}

export const tauFinal = async({ params, year }) => {
    const {
        'bagrutTau': bagrut,
        'psycho': psycho,
        'mor': mor
    } = params
    const grade = tauFinalCalc({ bagrut, psycho, mor, year })

    return {
        value: (grade).toFixed(2)
    }
}

export const tauBargut = ({ params, values }) => {
    const {
        baseAvg,
        notRequired,
        addedArgs
    } = getBaseAvg(params, values, 'tau', getBonus)

    const {
        value,
        payload
    } = getBestAverage(baseAvg, notRequired, 117, 20, addedArgs)

    const result = {
        payload: {
            ...payload,
            addedArgs
        },
        value: (value).toFixed(2)
    }
    return result
}


export const tauInitialArgs = {
    [psycho._id]: {
        coef: initialStd.psycho,
        hasYear: true
    },
    [bagrutTau._id]: {
        coef: initialStd.bagrut,
        hasYear: true
    },
    "intercept": {
        coef: initialStd.intercept,
        hasYear: true
    }
} 

export const tauFinalArgs = {
    [psycho._id]: {
        coef: finalStd.psycho,
        hasYear: true
    },
    [bagrutTau._id]: {
        coef: finalStd.bagrut,
        hasYear: true
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


export const tauReverse = {
    [initialTau._id]: [
        bagrutTau._id, psycho._id
    ],
    [finalTau._id]: [
        bagrutTau._id, psycho._id, mor._id
    ]
}
