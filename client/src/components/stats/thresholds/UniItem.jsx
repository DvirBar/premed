import React from 'react'
import { useSelector } from 'react-redux'
import { getCalcsByUniAndPath } from '../../../redux/selectors/statsinputs'
import CalcsList from './calcs/CalcsList'

function UniItem({ pathId, uni, tableId }) {
    const calcs = useSelector(getCalcsByUniAndPath(pathId, uni._id))
    
    const uniNameStyle = {
        color: uni.color
    }

    return (
        <div className="uni-item">
            <p 
            className="uni-name"
            style={uniNameStyle}>
                {uni.name}
            </p>
            <CalcsList
            calcs={calcs}
            tableId={tableId}
            backColor={uni.color} />
        </div>
    )
}

export default UniItem
