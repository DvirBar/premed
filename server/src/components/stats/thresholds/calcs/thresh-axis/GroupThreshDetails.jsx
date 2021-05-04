import React, { useRef } from 'react'
import ThreshItem from './ThreshItem'
import useOnClickOutside from '../../../../common/useOnClickOutside'

function GroupThreshDetails({ 
    threshes, 
    display, 
    toggleDisplay, 
    color }) {
    const ref = useRef()
    useOnClickOutside(ref, display, () => toggleDisplay(false))

    return (
        <div className={`group-thresh-details
        ${display ? 'display' : ''}`}>
            <div 
            ref={ref}
            className="wrapper">
                <div className="thresh-container">
                    {threshes.map(thresh =>
                        <ThreshItem
                        key={thresh._id}
                        thresh={thresh}
                        color={color} />
                    )}
                </div>
            </div>
        </div>
    )
}

export default GroupThreshDetails
