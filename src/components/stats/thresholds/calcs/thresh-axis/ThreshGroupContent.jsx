import React, { useState } from 'react'
import GroupSum from './GroupSum'
import GroupThreshDetails from './GroupThreshDetails'

function ThreshGroupContent({ threshes, color }) {
    const [display, setDisplay] = useState(false)

    const toggleDisplay = () => {
        setDisplay(!display)
    }

    const changeDisplay = display => {
        setDisplay(display)
    }
    return (
        <div className="group-sum">
            <GroupThreshDetails
            display={display}
            toggleDisplay={changeDisplay}
            threshes={threshes}
            color={color} />
            <GroupSum
            display={display}
            toggleDisplay={toggleDisplay}
            threshes={threshes}
            color={color} />
        </div>
    )
}

export default ThreshGroupContent
