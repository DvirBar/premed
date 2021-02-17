import React from 'react'
import CalcThreshAxis from './thresh-axis/CalcThreshAxis'
import TypeSelector from '../TypeSelector'

function CalcContent({ 
    typeOptions,
    selType, 
    selectType, 
    acceptThreshes, 
    rejectThreshes}) {

    return (
        <div className="calc-content">
            <TypeSelector 
            types={typeOptions}
            selType={selType}
            selectType={selectType} />

            {selType === 'accept'
            ?   <CalcThreshAxis
                threshes={acceptThreshes}
                type='accept' />

            :   <CalcThreshAxis
                threshes={rejectThreshes}
                type='reject' />
            }
        </div>
    )
}

export default CalcContent
