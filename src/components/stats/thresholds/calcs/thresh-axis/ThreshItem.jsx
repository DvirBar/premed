import React from 'react';
import moment from 'moment';

function ThreshItem({ thresh, color }) {

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
                {thresh.value.toFixed(3)}
            </span>

            <span className="thresh-date"> 
                {moment(thresh.date).format("DD/MM")}
            </span>
        </div>
    )
}

export default ThreshItem
