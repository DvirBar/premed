import React from 'react'
import CalcItem from './CalcItem'

function CalcsList({ calcs, tableId, backColor }) {
    return (
        <div 
        className="calcs-list">
            {calcs.map(calc =>
                <CalcItem
                key={calc._id}
                calc={calc}
                tableId={tableId}
                color={backColor} />)}
        </div>
    )
}

export default CalcsList
