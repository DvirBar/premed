import React from 'react'
import { useSelector } from 'react-redux'
import { getInputsByFieldId } from '../../../../../../../../redux/selectors/statsinputs'
import calculateReverse from './calculateReverse'

function ReverseCalcItem({ 
    calc, 
    year, 
    fieldValue, 
    fieldsValues,
    threshold 
}) {
    const field = useSelector(getInputsByFieldId(fieldValue.field))

    const result = calculateReverse(
        field, 
        fieldsValues, 
        calc.calcRecog,
        year,
        threshold)

    return (
        <div className="reverse-calcs-list__item">
            <div className="reverse-calcs-list__item__name">
                {field?.name}
            </div>
            <div className="reverse-calcs-list__item__result">
                {result}
            </div>
        </div>
    )
}

export default ReverseCalcItem
