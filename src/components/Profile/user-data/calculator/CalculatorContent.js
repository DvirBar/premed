import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import Loadbar from '../../../layout/Loadbar';
import CalcsBlock from './CalcsBlock';
import { copyToSimulate } from '../../../../redux/actions/userdata';
import { getInputsByArgs } from '../../../../redux/selectors/statsinputs';
import ArgsBlock from './ArgsBlock';
import useSimulateExecCalcs from './useSimulateExecCalcs';
import { getUnisByInputs } from '../../../../redux/selectors/unis';
import useDataValidation from '../data-block/useDataValidation';

function CalculatorContent({ chosenCalcs, togglePickCalcs }) {
    const {
        fields,
        groups,
        calcs
    } = useSelector(getInputsByArgs(chosenCalcs))

    const unis = useSelector(getUnisByInputs(
        fields, 
        groups, 
        chosenCalcs))

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
            calcs={calcs}
            unis={unis} />
            
            <CalcsBlock 
            calcs={chosenCalcs}
            unis={unis}
            changeStartSimulate={changeStartSimulate} />
        </div>
    )
}

CalculatorContent.propTypes = {
    chosenCalcs: PropTypes.array.isRequired,
    togglePickCalcs: PropTypes.func.isRequired
}

export default CalculatorContent
