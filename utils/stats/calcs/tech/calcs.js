import { getBestAverage } from '../methods'
import { bagrut } from '../../dataGroups';
import getBonus from './bonusMap';

export const techBagrut = (params, uSettings) => {
    let subjSum = 0;
    let unitsCounter = 0;
    let notRequired = {}

    /* Get average of required subjects and store 
        not required in an array */
    for(let subj in params) {
        const config = bagrut.find(arg => arg.varName === subj).config;
        let techGroups

        // Get huji config group
        if(config.uniqueBagType) {
            techGroups = config[uSettings.bagType].tech
        }
        
        else {
            techGroups = config.tech
        }

        if(techGroups?.includes('isRequired')) {
            const {
                units,
                grade
            } = params[subj]

            subjObj = {
                values: params[subj],
                groups: techGroups
            }

            let unitsToAdd = units
            if(subj === 'math' && units >= 4) {
                unitsToAdd = unitsToAdd * 2
            }

            subjSum += grade + getBonus(subj, params[subj]) * unitsToAdd
            unitsCounter += unitsToAdd
        }

        else {
            notRequired[subj] = {
                values: params[subj],
                groups: tauGroups
            }
        }
    }

    // Get average of required subjects
    let baseAvg = {
        grade: subjSum / unitsCounter,
        units: unitsCounter
    }

    
    for(let argVar of notRequired) {
        let hasSci = false
        let hasTech = false

        const bonusGroups = args.bagrut.find(arg => arg.varName === argVar).bonusGroups

        if(bonusGroups?.tech?.includes('sci')) 
            hasSci = true
        
        if(bonusGroups?.tech?.includes('tech')) 
            hasTech = true   
    }

    const config = {
        useComb: true
    }

    let result = getBestAverage(baseAvg, notRequired, 119, 20, getBonus, config)
    result = {
        ...result,
        value: (result.value).toFixed(2)
    }
    return result
}

const requiredSubj = [
    'math',
    'eng',
    'history',
    'civics',
    'heb',
    'lit',
    'bible'
]