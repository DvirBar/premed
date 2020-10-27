import React, { Fragment } from 'react'
import FloatButton from '../../../layout/FloatButton'

function Calculator() {
    return (
        <Fragment>
            <FloatButton 
            className="calculator-button" 
            toolTip="מחשבון">
                <i className="material-icons float-button">
                    calculate
                </i>
            </FloatButton>
        </Fragment>
    )
}

export default Calculator
