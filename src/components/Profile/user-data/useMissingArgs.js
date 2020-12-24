import React, { useContext, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getGroups } from '../../../redux/selectors/statsinputs';
import { getSelTypes } from '../../../redux/selectors/userdata';
import getGroupConfig from './data-block/getGroupConfig';
import { GroupsContext } from './data-block/GroupsContext';
import { hasGroupValues } from './data-block/useDataValidation';


const useMissingArgs = (storedCalcs, dataVals) => {
    const [missingArgs, setMissingArgs] = useState()
    const groups = useSelector(getGroups)
    const selTypes = useSelector(getSelTypes)
    const [finished, setFinished] = useState(false)

    useEffect(() => {
        let tempArgs = []

        if(storedCalcs && storedCalcs.length !== 0 && dataVals) {
            let missing = []
            
            // Loop through stored calc and find missing args
            for(let storedCalc of storedCalcs) {
                const groupArgs = storedCalc?.args?.filter(arg => 
                    arg.type === "group")

    
                missing = storedCalc?.args?.filter(arg => {
                 
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
                                    return arg
                                }

                                return false
                            }

                            return arg
                        }
                }}
                    
                // If the argument is not a group, find if the field has a value 
                    else if(!dataVals.find(val => 
                        val.field === arg._id)) {
                        return arg;
                    }
                })
            
                /* If missing args array is not empty, insert the array 
                    to the relevant calc */
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
