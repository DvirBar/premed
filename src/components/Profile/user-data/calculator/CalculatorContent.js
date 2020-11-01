import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { getFieldsByArgs } from '../../../../redux/selectors/datafields';
import { useDispatch, useSelector } from 'react-redux';
import useMissingArgs from '../useMissingArgs';
import Loadbar from '../../../layout/Loadbar';
import CalcsBlock from './CalcsBlock'
import ArgsFieldsBlock from './ArgsFieldsBlock';
import { getCalcsByFields } from '../../../../redux/selectors/calcs';
import { copyToSimulate, simulateCalcs } from '../../../../redux/actions/userdata';

function CalculatorContent({ chosenCalcs, togglePickCalcs }) {
    const storedCalcs = useSelector(state => 
        getCalcsByFields(state.calcs.storedCalcs, chosenCalcs))

    const fields = useSelector(state => 
        getFieldsByArgs(state.datafields.fields, storedCalcs))

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
    const missingArgs = useMissingArgs(storedCalcs, simulatedData)

    const simulateExecCalcs = () => {
        const notMissingCalcs = storedCalcs.filter(calc =>
            !missingArgs.find(item => item.calc === calc.id))
    
        if(notMissingCalcs.length !== 0) {
            const dataObj = {
                values: simulatedData,
                calcIds: notMissingCalcs.map(calc => calc.id)
            }
            dispatch(simulateCalcs(dataObj))
        }
    }

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

            <ArgsFieldsBlock 
            fields={fields}
            simulateExecCalcs={simulateExecCalcs} />
            <CalcsBlock 
            calcs={chosenCalcs}
            disabledCalcs={disabledCalcs} />
        </div>
    )
}

CalculatorContent.propTypes = {
    chosenCalcs: PropTypes.array.isRequired,
    togglePickCalcs: PropTypes.func.isRequired
}

export default CalculatorContent
