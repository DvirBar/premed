import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import Loadbar from '../../../layout/Loadbar';
import CalcsBlock from './CalcsBlock/CalcsBlock';
import { copyToSimulate } from '../../../../redux/actions/userdata';
import { getInputsByArgs } from '../../../../redux/selectors/statsinputs';
import ArgsBlock from './ArgsBlock';
import useSimulateExecCalcs from './useSimulateExecCalcs';
import useDataValidation from '../data-block/useDataValidation';

function CalculatorContent({ chosenCalcs, togglePickCalcs, display }) {
    const {
        fields,
        groups,
        calcs
    } = useSelector(getInputsByArgs(chosenCalcs))

    const { 
        loading, 
        selTable, 
        simulatedData } = useSelector(state => state.userdata)

    // Populate simulation data every time chosenCalcs has changed
    const dispatch = useDispatch()
    useEffect(() => {
        if(chosenCalcs.length !== 0)
            dispatch(copyToSimulate(selTable, fields))
    }, [chosenCalcs])

    // Find missing args and define calcs simulation function
    useDataValidation(chosenCalcs, simulatedData.values)

    const [startSimulate, setStartSimulate] = useState(false)
    const changeStartSimulate = status => {
        setStartSimulate(status)
    }

    useSimulateExecCalcs(
        chosenCalcs,
        startSimulate, 
        changeStartSimulate)
    
    if(loading)
        return <Loadbar />

    return (
        <div className="calculator-content">
            <div 
            onClick={() => togglePickCalcs(true)}
            className="goto-pick-calcs">
                <i className="material-icons">
                    navigate_next
                </i>
                <span>
                    בחירת שקלולים
                </span>
            </div>
            <ArgsBlock
            fields={fields}
            groups={groups}
            calcs={calcs} />
            
            {display &&
                <CalcsBlock 
                calcs={chosenCalcs}
                changeStartSimulate={changeStartSimulate} />
            }
        </div>
    )
}

CalculatorContent.propTypes = {
    chosenCalcs: PropTypes.array.isRequired,
    togglePickCalcs: PropTypes.func.isRequired
}

export default CalculatorContent
