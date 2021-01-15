import getBestAverage  from '../executeCalc/getBestAverage'
import getBonus from './bonusMap';
import getBaseAvg from '../executeCalc/getBaseAvg';
import groups from '../../groups/dataGroups';
import getGroupConfig from '../../groups/getGroupConfig';

export const techInitial = params => {
    const {
        'bagrutTech': bagrut,
        'psycho': psycho,
    } = params

    const techCog = 0.5 * bagrut + 0.075 * psycho - 19

    return {
        value: Math.ceil(techCog * 100) / 100
    }
}

export const techBagrut = (params, values) => {
    let hasSci = false
    let hasTech = false

    let sciCounter = 0
    
    for(let argVar in params) {
        const group = groups.find(thisGroup => 
            thisGroup._id === argVar)

        const config = getGroupConfig(values, group)
        let techGroups = config['tech']

        if(techGroups) {
            if(techGroups.includes('sci')) {
                hasSci = true
                sciCounter ++
            }
    
            if(techGroups.includes('tech')) {
                hasTech = true
            }
        }
    }

    const useCombo = 
    params['math'].units === 5 && 
    (hasSci && hasTech || 
    sciCounter >= 2) ? true : false

    const config = {
        useCombo,
        comboCount: 0
    }

    const {
        baseAvg,
        notRequired
    } = getBaseAvg(params, values, 'tech', getBonus, config)

    let result = getBestAverage(baseAvg, notRequired, 119, 20, getBonus)

    result = {
        ...result,
        value: Math.round(result.value * 10) / 10
    }
    return result
}