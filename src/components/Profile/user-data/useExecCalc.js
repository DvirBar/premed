import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { executeCalc } from '../../../redux/actions/userdata';
import { getAllStoredCalcs } from '../../../redux/selectors/calcs';
import { getCalcFields } from '../../../redux/selectors/datafields';

/* This function finds calcs that are dependent on other calcs, and 
that have no other missing args except the other calcs */
const getNextCalcs = (stagedLevel, calcs, storedCalcs, missingArgs) => {
    const nextCalcs = []

    for(let calc of calcs) {
        const storedCalc = storedCalcs.find(storCalc => 
            storCalc.id === calc.calcOutput.storedCalc)

        /* If first calc is an arg of stored calc and it hasn't got
        other args missing */
        if(storedCalc.args.find(arg =>
            stagedLevel.find(stagedCalc => 
                stagedCalc.role === arg.role))) {

            const calcMissingArgs = missingArgs.find(missingCalc => 
                missingCalc.calc === storedCalc.id)?.missing
            
            let foundBadArg = false;

            if(calcMissingArgs) {
                 // Check that the only missing args are staged calcs
                for(let missingArg of calcMissingArgs) {
                    let found = false

                        for(let stagedCalc of stagedLevel) {
                            if(stagedCalc.role === missingArg.role) {
                                found = true
                                break;
                            }
                        }
                    if(!found) {
                        foundBadArg = true
                        break
                    }  
                }
            }

            if(!foundBadArg) {
                nextCalcs.push(calc)
            }
        }
    }
    
    // Base case
    if(nextCalcs.length === 0)
        return []
    
    return [nextCalcs, ...getNextCalcs(nextCalcs, calcs, storedCalcs, missingArgs)]
}

/* This hook gets a changed field and only executes 
calcs that depend on that field */
function useExecCalc(missingArgs) {
    const dispatch = useDispatch()

    const changedField = useSelector(state => 
        state.userdata.changedField)

    const calcs = useSelector(state => 
        getCalcFields(state.datafields.fields))
    const storedCalcs = useSelector(getAllStoredCalcs)

    useEffect(() => {
        if(missingArgs && changedField) {
            const fieldGroup = changedField.field?.group
            let relevantCalcs

            if(fieldGroup) {
                relevantCalcs = calcs.filter(calc => 
                    storedCalcs.find(storedCalc => 
                        storedCalc.id === calc.calcOutput.storedCalc)
                    .args.find(arg => arg.role === fieldGroup.role))
            }
            
            else {
                relevantCalcs = calcs.filter(calc => 
                    storedCalcs.find(storedCalc => 
                        storedCalc.id === calc.calcOutput.storedCalc)
                    .args.find(arg => arg.role === changedField.role))
            }
        
            let firstCalcs = [];
        
            for(let calc of relevantCalcs) {
                // Check that stored calc hasn't got missing args
                const found = missingArgs.find(arg => 
                        arg.calc === calc.calcOutput.storedCalc)
    
                if(!found) {
                    firstCalcs.push(calc)
                }
            }

            if(firstCalcs.length > 0) {
                let calcSequence = [firstCalcs, ...getNextCalcs(
                    firstCalcs, 
                    calcs, 
                    storedCalcs, 
                    missingArgs)]

                calcSequence = calcSequence.map(item => 
                    item.map(calc => calc.calcOutput.storedCalc))
            
                dispatch(executeCalc(calcSequence))
                console.log(calcSequence);
            }
        }
    }, [changedField])
}

export default useExecCalc
