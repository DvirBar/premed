import React, { Fragment, useState } from 'react';
import FloatButton from '../../../layout/FloatButton';
import CalcItemInfo from './CalcsBlock/CalcItemInfo';
import CalculatorBody from './CalculatorBody';

function Calculator() {
    const [displayCalc, setDisplayCalc] = useState(false)

    const toggleCalc = toggle => {
        setDisplayCalc(toggle)
    }

    return (
        <Fragment>
            <div className="calculator">
                <FloatButton 
                className="calculator-button" 
                toolTip="מחשבון"
                onClick={() => toggleCalc(true)}>
                    <i className="material-icons float-button">
                        calculate
                    </i>
                </FloatButton>
                <CalculatorBody
                display={displayCalc}
                toggleModal={toggleCalc} />
            </div>
        </Fragment>
    )
}

export default Calculator
