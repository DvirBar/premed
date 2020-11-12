import React from 'react';
import moment from 'moment';

function ThreshItem({ thresh }) {
    return (
        <div 
        className={thresh.isFinal
        ?   "thresh-item final"
        :   "thresh-item"}>
            <div className="tool-tip">
                {moment(thresh.date).format("D בMMMM")}
            </div>
            {thresh.isFinal &&
                <div>סופי</div>
            }
            <span className="thresh-value">
                {thresh.value}
            </span>
            <i className="material-icons indicator">
                arrow_drop_down
            </i>
        </div>
    )
}

export default ThreshItem
