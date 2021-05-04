import React, { useContext } from 'react';
import moment from 'moment';
import { ThresholdContext } from '../ThresholdContext';

function ThreshItem({ thresh }) {
    const {
        calc
    } = useContext(ThresholdContext)
    return (
        <div
        className={thresh.isFinal
        ?   "thresh-item final"
        :   "thresh-item"}>
            {thresh.isFinal &&
                <span>סופי</span>
            }
            <span 
            className="thresh-value">
                {thresh.value.toFixed(calc.fractionDigits)}
            </span>

            <span className="thresh-date"> 
                {moment(thresh.date).format("DD/MM")}
            </span>
        </div>
    )
}

export default ThreshItem
