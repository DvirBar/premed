import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { getGroupFields } from '../../../redux/reducers';
import { getGroups } from '../../../redux/selectors/statsinputs';

const useMissingArgs = (storedCalcs, dataVals, selType) => {
    const [missingArgs, setMissingArgs] = useState()
    const groups = useSelector(getGroups)

    useEffect(() => {
        let tempArgs = []

        if(storedCalcs && storedCalcs.length !== 0 && dataVals) {
            let missing = []

            // Loop through stored calc and find missing args
            for(let storedCalc of storedCalcs) {
                const groupArgs = storedCalc?.args?.filter(arg => 
                    arg.type === "group")

                let replaceables = []
    
                missing = storedCalc?.args?.filter(arg => {
                 

                // If the arg is a group
                if(arg.type === "group" && groupArgs) {
                    const group = groups.find(group => 
                        group._id === arg._id)

                    const config = group.config.uniqueGroupType
                    ?   group.config[selType]
                    :   group.config

                    /* Get group config according to group type 
                    if provided, and check if arg is optional */
                    const isOptional = config.isOptional

                    if(!isOptional) {
                        const groupFields = group.fields
            
                        /* Loop through group fields and find with they 
                        all have values if not, return arg */
                        for(let field of groupFields) {
                            if(!dataVals.find(val => 
                                val.field === field._id &&
                                val.group === arg._id)) {

                                if(config && config.replaceable) {
                                    const replaceObj = {
                                        arg,
                                        replaceItem: config.replaceable
                                    }
                                    replaceables.push(replaceObj)
                                    return false;
                                }
                            
                                return arg
                        }}}
                }
                    
                // If the argument is not a group, find if the field has a value 
                    else if(!dataVals.find(val => 
                        val.field === arg._id)) {
                        return arg;
                    }})

                if(replaceables.length !== 0) {
                    replaceables = replaceables.filter(item => 
                        missing.find(arg => 
                            item.replaceItem === arg._id))
                }
                
                missing = [...missing, ...replaceables.map(item => item.arg)]

                /* If missing args array is not empty, insert the array 
                    to the relevant calc */
                if(missing.length !== 0) {
                    tempArgs = [
                        ...tempArgs,
                        {
                            calc: storedCalc._id,
                            missing
                        }
                    ]
                }
            }
            setMissingArgs(tempArgs)
        }
    }, [dataVals, storedCalcs])
    
    return missingArgs
    
}

export default useMissingArgs
