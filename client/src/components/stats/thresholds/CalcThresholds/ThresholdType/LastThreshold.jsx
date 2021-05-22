import moment from 'moment'
import React from 'react'
import { useSelector } from 'react-redux'
import { selectLastThreshold } from '../../../../../redux/stats/datatables/selectors'
import ThresholdItem from '../ThresholdItem/ThresholdItem'

function LastThreshold({ 
    year,
    calcId,
    type 
}) {
    const lastThreshold = useSelector(selectLastThreshold(year, calcId, type))
    return (
        <ThresholdItem 
        name="סכם נוכחי"
        isLast={true}
        type={type}
        threshold={lastThreshold} />
    )
}

export default LastThreshold
