import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { getGroupFields } from '../../../redux/reducers';

const useMissingArgs = (storedCalcs, dataVals) => {
    const [missingArgs, setMissingArgs] = useState([])
    const groupFields = useSelector(state => 
        getGroupFields(state.datafields.fields))

    useEffect(() => {
        let tempArgs = []

        if(storedCalcs && storedCalcs.length !== 0 && dataVals) {
            let missing = []

            for(let storedCalc of storedCalcs) {
                const groupArgs = storedCalc?.args?.filter(arg => 
                    arg.type === "group")
    
                missing = storedCalc?.args?.filter(arg => {
                    if(arg.type === "group" && groupArgs) {
                        let roleGroupFields = groupFields.filter(field => 
                            field.group.role === arg.role);
                
                        for(let field of roleGroupFields) {
                            if(!dataVals.find(val => 
                                val.field?._id === field._id)) {
                                return arg
                            }}}
        
                    else if(!dataVals?.find(val => 
                        val.field?.role === arg.role)) {
                        return arg;
                    }
                })

                /* If missing args array is not empty, insert the array 
                    to the relevant calc */
                if(missing.length !== 0) {
                    tempArgs = [
                        ...tempArgs,
                        {
                            calc: storedCalc.id,
                            missing
                        }
                    ]
                }
            }
        }

        setMissingArgs(tempArgs)
    }, [dataVals])
    
    return missingArgs
}

export default useMissingArgs
