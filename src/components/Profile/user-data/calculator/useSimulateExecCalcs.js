import { useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { simulateCalcs } from '../../../../redux/actions/userdata';
import { getCustomGroupsSimulated, getSimulatedGroups, getSimulatedVals, selTableSelector } from '../../../../redux/selectors/userdata';
import { GroupsContext } from '../data-block/GroupsContext';
import { getNextCalcs } from '../hooks/useExecCalc';

const isFirstCalc = (calc, validErrors) => {
    return (!validErrors.find(item => item.calc === calc._id) &&
           !calc.args.find(arg => arg.type === 'calc'))
}

/*  Check that one of the args of the calc is in chosen calcs. 
    if not, add it to first calcs - this way we will assure that it will
    be executed */
const DepOnChosenCalc = (calc, chosenCalcs) => {
    return calc.args.find(arg => chosenCalcs.find(chosenCalc =>
        chosenCalc._id === arg._id))
}

function useSimulateExecCalcs(
    chosenCalcs, 
    startSimulate, 
    changeStartSimulate) {

    const dispatch = useDispatch()
    const selTable = useSelector(selTableSelector)
    const values = useSelector(getSimulatedVals);
    const customGroups = useSelector(getCustomGroupsSimulated);
    const {
        getValidErrors
    } = useContext(GroupsContext)

    const validErrors = useSelector(getValidErrors)

    useEffect(() => {
        if(startSimulate) {
            /* Find calcs that doesn't have valid errors
            and that don't have calcs as args */
            let firstCalcs = []
            let nextCalcs = []

            for(let calc of chosenCalcs) {
                if((isFirstCalc(calc, validErrors) ||
                   !DepOnChosenCalc(calc, chosenCalcs))) 
                    firstCalcs.push(calc._id)

                else 
                    nextCalcs.push(calc)
            }

            if(firstCalcs.length > 0) {
                const calcSequence = [firstCalcs, ...getNextCalcs(
                    firstCalcs,
                    nextCalcs,
                    validErrors
                )]
        
                dispatch(simulateCalcs(
                    calcSequence, 
                    values,
                    customGroups, 
                    selTable))
                changeStartSimulate(false)
            }
        }
    }, [startSimulate])
}

export default useSimulateExecCalcs
