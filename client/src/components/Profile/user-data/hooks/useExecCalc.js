import { useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearChangedField, executeCalc } from '../../../../redux/actions/userdata';
import { getAllStoredCalcs, getGroupById } from '../../../../redux/selectors/statsinputs';
import { selectGroupValsByIdReal } from '../../../../redux/selectors/userdata';
import { GroupsContext } from '../data-block/GroupsContext';

/* This function finds(recusively) calcs that are dependent on other calcs, and 
that have no other missing args except for the other calcs */
export const getNextCalcs = (stagedLevel, storedCalcs, validErrors) => {
    const nextCalcs = []

    for(let calc of storedCalcs) {
        /* If first calc is an arg of stored calc and it hasn't got
        other args missing */
        if(calc.args.find(arg =>
            stagedLevel.find(stagedCalc => 
                stagedCalc === arg._id))) {

            const calcErrorArgs = validErrors.find(err => 
                err.calc === calc._id)?.payload

            // Find the calcs valid errors
            let foundBadArg = false;

            if(calcErrorArgs) {
                 // Check that the only valid errors are staged calcs
                for(let errorArg of calcErrorArgs) {
                    let found = false
 
                    /* For each valid error loop through staged calcs */
                    for(let stagedCalc of stagedLevel) {
                        if(stagedCalc === errorArg._id) {
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
    
    return [nextCalcs, ...getNextCalcs(nextCalcs, storedCalcs, validErrors)]
}

// This function checks if an optional field
const checkChangedFieldArgs = (group, groupVals) => {
    if(!group || group.fields.length === groupVals.length)
        return true

    return false
}

/* This hook gets a changed field and only executes 
calcs that depend on that field */
function useExecCalc() {
    const {
        getValidErrors
    } = useContext(GroupsContext)

    const dispatch = useDispatch()
    const validErrors = useSelector(getValidErrors)

    const { changedField, dataRemoved } = useSelector(state => 
        state.userdata)

    const storedCalcs = useSelector(getAllStoredCalcs)

    const groupId = changedField?.cusGroupParent || changedField?.group 
    const fieldId = changedField?.field

    const group = useSelector(getGroupById(groupId || undefined))
    const groupVals = useSelector(selectGroupValsByIdReal(changedField?.group || undefined))

    useEffect(() => {
        if(validErrors && Object.keys(changedField).length > 0) {
            const relevantCalcs = storedCalcs
            .filter(storCalc => 
                storCalc.args.find(arg =>
                    (arg.type === "group" && arg._id === groupId) ||
                    arg._id === fieldId))
            .map(calc => calc._id)
        
            let firstCalcs = [];
        
            for(let calc of relevantCalcs) {
                // Check that stored calc hasn't got missing args
                const found = validErrors.find(err => 
                        err.calc === calc)
    
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
                    validErrors)]
                 
                dispatch(executeCalc(calcSequence))
            }

            dispatch(clearChangedField())
        }
    }, [validErrors])
}

export default useExecCalc
