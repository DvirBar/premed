import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { executeCalc } from '../../../redux/actions/userdata';
import { getAllStoredCalcs, getGroupById } from '../../../redux/selectors/statsinputs';
import { getGroupValsReal } from '../../../redux/selectors/userdata';

/* This function finds calcs that are dependent on other calcs, and 
that have no other missing args except the other calcs */
export const getNextCalcs = (stagedLevel, storedCalcs, missingArgs) => {
    const nextCalcs = []

    for(let calc of storedCalcs) {
        /* If first calc is an arg of stored calc and it hasn't got
        other args missing */
        if(calc.args.find(arg =>
            stagedLevel.find(stagedCalc => 
                stagedCalc === arg._id))) {

            // Find the calcs missing args
            const calcMissingArgs = missingArgs.find(missingCalc => 
                missingCalc.calc === calc._id)?.missing
            
            let foundBadArg = false;

            if(calcMissingArgs) {
                 // Check that the only missing args are staged calcs
                for(let missingArg of calcMissingArgs) {
                    let found = false

                    /* For each missing arg loop through staged calcs */
                    for(let stagedCalc of stagedLevel) {
                        if(stagedCalc === missingArg._id) {
                            found = true
                            break;
                        }
                    }

                    if(!found) {
                        foundBadArg = true
                        break;
                    }  
                }
            }

            if(!foundBadArg) {
                nextCalcs.push(calc._id)
            }
        }
    }
    
    // Base case
    if(nextCalcs.length === 0)
        return []
    
    return [nextCalcs, ...getNextCalcs(nextCalcs, storedCalcs, missingArgs)]
}

// This function checks if an optional field
const checkChangedFieldArgs = (group, groupVals) => {
    if(!group || group.fields.length === groupVals.length)
        return true

    return false
}

/* This hook gets a changed field and only executes 
calcs that depend on that field */
function useExecCalc(missingArgs) {
    const dispatch = useDispatch()

    const { changedField, dataRemoved } = useSelector(state => 
        state.userdata)

    const storedCalcs = useSelector(getAllStoredCalcs)

    const groupId = changedField?.cusGroupParent || changedField?.group 
    const fieldId = changedField?.field

    const group = useSelector(getGroupById(groupId || undefined))
    const groupVals = useSelector(getGroupValsReal(changedField?.group || undefined))

    useEffect(() => {
        if(missingArgs && changedField) {
            const relevantCalcs = storedCalcs
            .filter(storCalc => 
                storCalc.args.find(arg =>
                    (arg.type === "group" && arg._id === groupId) ||
                    arg._id === fieldId))
            .map(calc => calc._id)
        
            let firstCalcs = [];
        
            for(let calc of relevantCalcs) {
                // Check that stored calc hasn't got missing args
                const found = missingArgs.find(arg => 
                        arg.calc === calc)
    
                if(!found &&
                    (checkChangedFieldArgs(group, groupVals) || 
                    dataRemoved)) {
                    firstCalcs.push(calc) 
                }
            }
          

            if(firstCalcs.length > 0) {
                const calcSequence = [firstCalcs, ...getNextCalcs(
                    firstCalcs, 
                    storedCalcs, 
                    missingArgs)]


                console.log(calcSequence);
                 
                dispatch(executeCalc(calcSequence))
            }
        }
    }, [missingArgs])
}

export default useExecCalc
