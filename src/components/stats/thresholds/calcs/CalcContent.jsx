import React from 'react'
import CalcThreshAxis from './thresh-axis/CalcThreshAxis'
import TypeSelector from '../TypeSelector'
import InitLastValues from './thresh-axis/InitLastValues'

function CalcContent({ 
    color,
    typeOptions,
    selType, 
    selectType, 
    acceptThreshes, 
    rejectThreshes}) {
    const threshes = selType === 'accept'
    ? acceptThreshes : rejectThreshes

    const initValue = threshes[0]?.value
    const finalValue = threshes.find(thresh => thresh.isFinal)?.value
    return (
        <div className="calc-content">
            <TypeSelector 
            types={typeOptions}
            selType={selType}
            selectType={selectType} />

            <InitLastValues
            color={color}
            initValue={initValue}
            finalValue={finalValue} />

            <CalcThreshAxis
            threshes={threshes}
            type={selType} />
        </div>
    )
}

export default CalcContent
