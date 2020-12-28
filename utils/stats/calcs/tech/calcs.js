import getBestAverage  from '../executeCalc/getBestAverage'
import getBonus from './bonusMap';
import getBaseAvg from '../executeCalc/getBaseAvg';
import groups from '../../groups/dataGroups';
import getGroupConfig from '../../groups/getGroupConfig';

export const techBagrut = (params, values) => {
    let hasSci = false
    let hasTech = false
    
    for(let argVar in params) {
        const group = groups.find(thisGroup => 
            thisGroup._id === argVar)

        const config = getGroupConfig(values, group)
        let techGroups = config['tech'] 

        if(techGroups) {
            if(techGroups.includes('sci')) {
                hasSci = true
            }
    
            if(techGroups.includes('tech')) {
                hasTech = true
            }
        }
    }

    const useCombo = (hasSci && hasTech) ? true : false

    const config = {
        useCombo
    }

    const {
        baseAvg,
        notRequired
    } = getBaseAvg(params, values, 'tech', getBonus, config)

    let result = getBestAverage(baseAvg, notRequired, 119, 20, getBonus)
    
    result = {
        ...result,
        value: Math.floor(result.value * 10) / 10
    }
    return result
}