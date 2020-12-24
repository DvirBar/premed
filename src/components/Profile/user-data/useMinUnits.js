import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { getCalcWithGroupArgs, getGroups } from '../../../redux/selectors/statsinputs'
import { getSelTypes } from '../../../redux/selectors/userdata'
import getGroupConfig from './data-block/getGroupConfig'
import { hasGroupValues } from './data-block/useDataValidation'

function useMinUnits(missingArgs, finished, changeSeqStatus, dataVals) {
    const groupsVals = dataVals.filter(val => val.group)
    const selTypes = useSelector(getSelTypes)
    const calcs = useSelector(getCalcWithGroupArgs)
    const groups = useSelector(getGroups)
   
    const [invalidCalcs, setInvalidCalcs] = useState([])

    useEffect(() => {
        const found = missingArgs.find(calcArgs => calcArgs.payload.find(arg => 
            arg.type === 'group'))
        
        // Only run if missing args algorithm has finished
        if(finished) {
            if(!found) {
                let missingGroups = []
    
                for(let group of groups) {
                    const config = getGroupConfig(group, selTypes)
                    if(config && config.minUnits) {
                        const units = groupsVals.find(val => 
                            val.group === group._id && 
                            val.field === 'units')?.value
                        
                        /* Only add to array IF no units value was found OR */
                        if((!units || units < config.minUnits)) {
                            if(config.replaceable) {
                                const repGroup = groups.find(group => 
                                    group._id === config.replaceable)
                                if(!hasGroupValues(groupsVals, repGroup)) {
                                    missingGroups.push(group)
                                }
                            }

                            else {
                                missingGroups.push(group)
                            }
                        }  
                    }
                }
    
                let invalCalcs = []
    
                if(missingGroups.length > 0) {
                    for(let calc of calcs) {
                        // First check that the calc hasn't got missing args
                        const invalidObj = {
                            calc: calc._id,
                            type: 'minUnits',
                            payload: missingGroups
                        }
    
                        invalCalcs.push(invalidObj)
                    }
                }
                setInvalidCalcs(invalCalcs)
            }

            changeSeqStatus(true)
        }
    }, [missingArgs, finished])

    return invalidCalcs
}

export default useMinUnits
