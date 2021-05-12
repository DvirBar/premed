import moment from 'moment'
import React, { useEffect } from 'react'
import { Fragment } from 'react'

function RerverseCalcsThresholdsSelector({ 
    calc,
    thresholds,
    selectedThreshold,
    setSelectedThreshold
}) {
    const initialText = "גל ראשון"
    const finalText = "סכם סופי"

    const selectThresh = threshold => {
        if(threshold) {
            setSelectedThreshold(threshold)
        }
    }

    useEffect(() => {
        if(calc._id) {
            setSelectedThreshold(thresholds[0])
        }
    }, [calc._id])

    return (
        <div className="reverse-calc-thresholds">
            {[0, 1].map(index => 
                <div 
                onClick={() => selectThresh(thresholds[index])}
                className={`reverse-calc-thresholds__item 
                ${selectedThreshold?._id === thresholds[index]?._id ? 'selected' : ''}`}>
                    <div className="reverse-calc-thresholds__item__type">
                        {thresholds[index]?.isInitial ? initialText : finalText}
                    </div>
                    {thresholds[index]
                    ?   <Fragment>
                            <div className="reverse-calc-thresholds__item__value">
                                {thresholds[index]?.value}
                            </div>
                            <div className="reverse-calc-thresholds__item__date">
                                {moment(thresholds[index].date).format("DD/MM")}
                            </div>
                        </Fragment>
                    :   <div className="thresh-unavailable">
                            עדיין לא נקבע
                        </div>
                    }
                    
                </div>
            )}
        </div>
    )
}

export default RerverseCalcsThresholdsSelector
