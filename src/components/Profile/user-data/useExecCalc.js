import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { executeCalc } from '../../../redux/actions/userdata';

/* This hook gets a changed field and only executes 
calcs that depend on that field */
function useExecCalc(storedCalcs, missingArgs) {
    const dispatch = useDispatch()

    const changedField = useSelector(state => 
        state.userdata.changedField)

    useEffect(() => {
        if(missingArgs) {
            for(let storedCalc of storedCalcs) {
                // Check that stored calc hasn't got missing args
                const found = missingArgs.find(arg => 
                    arg.calc === storedCalc.id)
    
                if(!found) {
                    const fieldGroup = changedField.field?.group

                    if(fieldGroup) {
                        if(storedCalc.args.find(arg => 
                            arg.role === fieldGroup.role)) {
                                dispatch(executeCalc(storedCalc.id))
                        }
                    }
        
                    else if(storedCalc.args.find(arg => 
                        arg.role === changedField.role)) {
                            dispatch(executeCalc(storedCalc.id))
                    }
                }
            }
        }
    }, [changedField, storedCalcs, missingArgs])
}

export default useExecCalc
