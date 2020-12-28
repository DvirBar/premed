import getBonus from './bonusMap';
import getBestAverage  from "../executeCalc/getBestAverage";
import groups from '../../groups/dataGroups';
import getBaseAvg from '../executeCalc/getBaseAvg';

export const tauBargut = (params, values) => {
    const {
        baseAvg,
        notRequired
    } = getBaseAvg(params, values, 'tau', getBonus)

    let result = getBestAverage(baseAvg, notRequired, 115, 20, getBonus)

    result = {
        ...result,
        value: (result.value).toFixed(2)
    }
    return result
}