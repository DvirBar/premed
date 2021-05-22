import React from 'react'
import moment from 'moment'

function AllThresholdsItem({ threshold, type }) {
    
    return (
        <div className="all-thresholds__item">
            {(threshold.isFinal || threshold.isInitial) &&
                <div className="all-thresholds__item__type">
                    {threshold.isFinal 
                        ? 'סופי' 
                        : 'ראשוני' }
                </div>                                
            }
            <div className="all-thresholds__item__value">
                {threshold.value}
            </div>                                
            <div className={`all-thresholds__item__date ${type.key}`}>
                {moment(threshold.date).format("DD/MM")}
            </div>                                
        </div>
    )
}

export default AllThresholdsItem
