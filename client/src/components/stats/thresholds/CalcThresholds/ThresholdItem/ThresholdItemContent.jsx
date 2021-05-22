import React from 'react'
import moment from 'moment'

function ThresholdItemContent({ threshold }) {
    
    return (
        <div className="threshold-item__content">
            <div className="threshold-item__content__value">
                {threshold.value}
            </div>
            <div className="threshold-item__content__date">
                {moment(threshold.date).format("DD/MM")}
            </div>
        </div>
    )
}

export default ThresholdItemContent
