import React from 'react'
import CalcsList from './CalcsList'

function UniItem({ uni, uniFields, tableId }) {
    return (
        <div className="uni-item">
            <p 
            className="uni-name"
            style={{color: uni.color}}>
                {uni.name}
            </p>
            <CalcsList
            calcs={uniFields}
            tableId={tableId}
            backColor={uni.color} />
        </div>
    )
}

export default UniItem
