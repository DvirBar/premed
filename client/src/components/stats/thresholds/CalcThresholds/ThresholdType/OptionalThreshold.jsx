import React from 'react'
import ThresholdItem from '../ThresholdItem/ThresholdItem'

function OptionalThreshold({ thresholds, sort, type }) {
    const threshold = thresholds.find(thresh => 
        thresh[sort.key])

    return (
        <ThresholdItem 
        name={sort.name}
        threshold={threshold}
        type={type} />
    )
}

export default OptionalThreshold
