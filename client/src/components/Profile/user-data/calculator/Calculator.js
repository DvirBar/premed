import React, { Fragment } from 'react';
import FloatButton from '../../../layout/FloatButton';
import CalculatorBody from './CalculatorBody';

function Calculator({ display, setDisplay}) {
    return (
        <Fragment>
            <div className="calculator">
                <FloatButton 
                className="calculator-button" 
                toolTip="מחשבון"
                onClick={() => setDisplay(true)}>
                    <i className="material-icons float-button">
                        calculate
                    </i>
                </FloatButton>
                <CalculatorBody
                display={display}
                toggleModal={setDisplay} />
            </div>
        </Fragment>
    )
}

export default Calculator
