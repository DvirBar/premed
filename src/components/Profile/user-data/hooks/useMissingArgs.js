import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { getGroups, getFieldsAndCalcs } from '../../../../redux/selectors/statsinputs';
import { getSelTypes } from '../../../../redux/selectors/userdata';
import getGroupConfig from '../data-block/getGroupConfig';
import { hasGroupValues } from '../data-block/useDataValidation';


const useMissingArgs = (storedCalcs, dataVals) => {
    const [missingArgs, setMissingArgs] = useState()
    const groups = useSelector(getGroups)
    const fields = useSelector(getFieldsAndCalcs)
    const selTypes = useSelector(getSelTypes)
    const [finished, setFinished] = useState(false)

    useEffect(() => {
        let tempArgs = []

        if(storedCalcs && storedCalcs.length !== 0 && dataVals) {
            // Loop through stored calc args and find missing args
            for(let storedCalc of storedCalcs) {
                let missing = []
                const args = storedCalc?.args || []

                const groupArgs = storedCalc?.args?.filter(arg => 
                    arg.type === "group")

                for(let arg of args) {
                    // If the arg is a group
                    if(arg.type === "group" && groupArgs) {
                        const group = groups.find(group => 
                            group._id === arg._id)

                        const config = getGroupConfig(group, selTypes)

                        /* Get group config according to group type 
                        if provided, and check if arg is optional */
                        const isOptional = config.isOptional

                        if(!isOptional) {
                        /* Loop through group fields and find with they 
                        all have values if not, return arg */
                            if(!hasGroupValues(dataVals, group)) {
                                /* If missing arg is replaceble check that 
                                the replaceble group has values */
                                if(config && config.replaceable) {
                                    const repGroup = groups.find(group =>
                                        group._id === config.replaceable)

                                    if(!hasGroupValues(dataVals, repGroup)) {
                                        missing.push({
                                            ...arg,
                                            name: group.name,
                                            replaceable: repGroup.name
                                        })

                                        break
                                    }


                                }
                                else {
                                    missing.push({
                                        ...arg,
                                        name: group.name
                                    })
                                }
                                
                            }
                    }}
                        
                    /* If the argument is not a group, 
                    find if the field has a value */
                    else if(!dataVals.find(val => 
                        val.field === arg._id)) {
                        const field = fields.find(field => 
                            field._id === arg._id)
                        missing.push({
                            ...arg,
                            name: field.name
                        })
                    }
                }
                /* If missing args array is not empty, 
                insert the array to the relevant calc */
                if(missing.length !== 0) {
                    tempArgs = [
                        ...tempArgs,
                        {
                            calc: storedCalc._id,
                            type: 'missing',
                            payload: missing
                        }
                    ]
                }
            }
            setFinished(true)
            setMissingArgs(tempArgs)
        }
    }, [dataVals, storedCalcs])

    
    return {
        missingArgs: missingArgs || [],
        finished
    }
}

export default useMissingArgs
