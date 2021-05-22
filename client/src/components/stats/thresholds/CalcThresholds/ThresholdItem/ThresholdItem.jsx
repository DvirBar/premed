import React from 'react'
import ThresholdItemContent from './ThresholdItemContent'

function ThresholdItem({ 
    name,
    threshold,
    type,
    isLast
}) {
    return (
        <div className={`threshold-item ${type} ${isLast ? 'last' : ''}`}>
            <div className="threshold-item__label">
                {name}
            </div>
            {threshold
            ?   <ThresholdItemContent
                threshold={threshold} />
            :   <div className="threshold-item__content no-threshold">
                    <span>
                        לא נקבע
                    </span>
                </div>
            }
        </div>
    )
}

export default ThresholdItem
