import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import ChooseCalcs from './ChooseCalcs';
import Modal from '../../../layout/Modal';
import CalculatorContent from './CalculatorContent';
import { useDispatch, useSelector } from 'react-redux';
import { copyToSimulate } from '../../../../redux/actions/userdata';

function CalculatorBody({ display, toggleModal }) {
    const [chosenCalcs, setChosenCalcs] = useState([])

    useEffect(() => {
        togglePickCalcs(true)
    }, [])

    /* When the user has chosen calcs but wants to change them,
        this state tells react to render ChooseCalcs */
    const [pickCalcs, setPickCalcs] = useState(false)
    const togglePickCalcs = toggle => {
        setPickCalcs(toggle)
    }

    const chooseCalc = calc => {
        if(chosenCalcs.find(thisCalc => thisCalc._id === calc._id))
            setChosenCalcs(chosenCalcs.filter(thisCalc => 
                thisCalc._id !== calc._id))

        else 
            setChosenCalcs([...chosenCalcs, calc]) 
    }

    return (
        <Modal
        display={display}
        toggleModal={toggleModal}>
            {pickCalcs 
            ?   <ChooseCalcs 
                chosenCalcs={chosenCalcs}
                chooseCalc={chooseCalc}
                togglePickCalcs={togglePickCalcs} />
            
            :   <CalculatorContent
                chosenCalcs={chosenCalcs}
                togglePickCalcs={togglePickCalcs} />
            }
        </Modal>
    )
}

CalculatorBody.propTypes = {
    display: PropTypes.bool.isRequired,
    toggleModal: PropTypes.func.isRequired
}

export default CalculatorBody
