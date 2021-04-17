import React from 'react'
import CalcItem from './CalcItem'
import ThresholdProvider from './ThresholdContext'

function CalcsList({ calcs, tableId, backColor }) {
    return (
        <div 
        className="calcs-list">
            {calcs.map(calc =>
                <ThresholdProvider calc={calc}>
                    <CalcItem
                    key={calc._id}
                    calc={calc}
                    tableId={tableId}
                    color={backColor} />
                </ThresholdProvider>
                
                
            )}
        </div>
    )
}

export default CalcsList
