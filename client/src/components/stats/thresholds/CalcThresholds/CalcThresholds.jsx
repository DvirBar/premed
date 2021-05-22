import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router'
import { getCalcsByUniAndPath } from '../../../../redux/selectors/statsinputs'
import CalcThresholdsItem from './CalcThreshold/CalcThresholdsItem'

function CalcThresholds({ uniId, uniColor }) {
    const { pathId } = useParams()
    const calcs = useSelector(getCalcsByUniAndPath(pathId, uniId))
    const style = {
        borderColor: uniColor
    }
    return (
        <div 
        style={style}
        className="uni-calcs-thresholds">
            {calcs.map(calc =>
                <CalcThresholdsItem
                key={calc._id}
                calc={calc}
                uniColor={uniColor} />   
            )}
        </div>
    )
}

export default CalcThresholds
