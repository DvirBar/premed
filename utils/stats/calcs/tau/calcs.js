import getBonus from './bonusMap';
import getBestAverage  from "../executeCalc/getBestAverage";
import getBaseAvg from '../executeCalc/getBaseAvg';
import { 
    tauInitial as initial2020, 
    tauFinal as final2020
} from './versions/2020';
import {
    tauInitial as initial2021
} from './versions/2021'

const calcMap = {
    initial: {
        2020: initial2020,
        2021: initial2021
    },
    final: {
        2020: final2020
    }
}

export const tauInitial = async({ params, year }) => {
    const {
        'bagrutTau': bagrut,
        'psycho': psycho,
    } = params

    const grade = await calcMap.initial[year]({ bagrut, psycho })

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
    
    const grade = calcMap.final[year]({ bagrut, psycho, mor })

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