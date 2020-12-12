import { bagrut } from '../../groups/bagrut';
import getBonus from './bonusMap';
import { getBestAverage } from "../methods";

export const tauBargut = (params, uSettings) => {
    let subjSum = 0;
    let unitsCounter = 0;
    let notRequired = {}
    
    /* Get average of required subjects and store 
        not required in an array */
    for(let subj in params) {
        const config = bagrut.find(arg => arg.varName === subj).config;
        let tauGroups

        // Get huji config group
        if(config.uniqueGroupType) {
            tauGroups = config[uSettings.bagType].tau
        }
        
        else {
            tauGroups = config.tau
        }

        if(tauGroups?.includes('isRequired')) {
            const {
                units,
                grade
            } = params[subj]

            subjObj = {
                values: params[subj],
                groups: tauGroups
            }

            subjSum += (grade + getBonus(subj, subjObj)) * units
            unitsCounter += units 
        }

        else {
            if(params.multiVals) {
                for(let param of params[subj])
                    notRequired[subj] = {
                        values: param,
                        groups: tauGroups
                    }
            }
                
            else {
                if(params[subj].multiVals) {
                    for(let param of params) {
                        notRequired[subj] = {
                            values: param,
                            groups: tauGroups
                        } 
                    }
                }
                
                notRequired[subj] = {
                    values: params[subj],
                    groups: tauGroups
                }
            }
        }
    }

    // Get average of required subjects
    let baseAvg = {
        grade: subjSum / unitsCounter,
        units: unitsCounter
    }

    let result = getBestAverage(baseAvg, notRequired, 115, 20, getBonus)
    result = {
        ...result,
        value: (result.value).toFixed(2)
    }
    return result
}