import React, { useContext } from 'react'
import { ThresholdContext } from '../ThresholdContext'

function GroupSum({ 
    threshes, 
    toggleDisplay, 
    display }) {

    const {
        calc
    } = useContext(ThresholdContext)

    return (
        <div 
        onClick={() => toggleDisplay(!display)}
        className="thresh-group-sum">
            <p 
            className="thresh-top">
                {(threshes[0].value).toFixed(calc.fractionDigits)}
            </p>
            <p
            className="thresh-bottom">
                {(threshes[threshes.length-1].value).toFixed(calc.fractionDigits)}
            </p>
        </div>
    )
}

export default GroupSum
