import getBonus from './bonusMap';
import getBestAverage from "../executeCalc/getBestAverage";
import getBaseAvg from '../executeCalc/getBaseAvg';

export const bguBargut = (params, values) => {
    const {
        baseAvg,
        notRequired
    } = getBaseAvg(params, values, 'bgu', getBonus)
    
    let result = getBestAverage(baseAvg, notRequired, 130, 20, getBonus)

    result = {
        ...result,
        value: (result.value).toFixed(2)
    }
    return result
}