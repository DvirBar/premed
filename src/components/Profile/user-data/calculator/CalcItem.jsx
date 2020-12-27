import React from 'react'
import { useSelector } from 'react-redux'
import { getFieldValSimulated } from '../../../../redux/selectors/userdata'

function CalcItem({ calc, uniColor }) {
    const valueObj = useSelector(getFieldValSimulated(calc._id))
    const backgroundStyle = {
        backgroundColor: uniColor + '30'
    }

    return (
        <div 
        style={backgroundStyle}
        className="calculator-calc-item">
            <p className="calc-name">
                {calc.name}
            </p>
            <p 
            className="calc-value">
                {valueObj && 
                (valueObj.value || 
                valueObj.suggestValue)}
            </p>
        </div>
    )
}

export default CalcItem
