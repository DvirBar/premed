import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import useMissingArgs from '../useMissingArgs';
import Loadbar from '../../../layout/Loadbar';
import CalcsBlock from './CalcsBlock'
import { copyToSimulate, simulateCalcs } from '../../../../redux/actions/userdata';
import { getInputsByArgs } from '../../../../redux/selectors/statsinputs';
import ArgsBlock from './ArgsBlock';
import useSimulateExecCalcs from './useSimulateExecCalcs';
import { getUnisByInputs } from '../../../../redux/selectors/unis';

function CalculatorContent({ chosenCalcs, togglePickCalcs }) {
    const {
        fields,
        groups,
        calcs
    } = useSelector(getInputsByArgs(chosenCalcs))

    const unis = useSelector(getUnisByInputs(fields, groups, chosenCalcs))

    /* Disable calcs that are also arguments to prevent 
        calculation inconsistency */
    const [disabledCalcs, setDisabledCalcs] = useState([])
    useEffect(() => {
        setDisabledCalcs(chosenCalcs.filter(calc => 
            fields.find(field => field._id === calc._id)))
    }, [chosenCalcs])

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
    const missingArgs = useMissingArgs(chosenCalcs, simulatedData.values)
    
    const [startSimulate, setStartSimulate] = useState(false)
    const changeStartSimulate = status => {
        setStartSimulate(status)
    }

    useSimulateExecCalcs(
        chosenCalcs,
        missingArgs, 
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
            unis={unis}
            changeStartSimulate={changeStartSimulate} />
            
            <CalcsBlock 
            calcs={chosenCalcs}
            unis={unis} />
        </div>
    )
}

CalculatorContent.propTypes = {
    chosenCalcs: PropTypes.array.isRequired,
    togglePickCalcs: PropTypes.func.isRequired
}

export default CalculatorContent
