import React from 'react'
import { useSelector } from 'react-redux'
import { getInputsByFieldId } from '../../../../../../../../redux/selectors/statsinputs'
import calculateReverse from './calculateReverse'

function ReverseCalcItem({ 
    isLast,
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
            <div className="reverse-calcs-list__item__content">
                <div className="reverse-calcs-list__item__content__name">
                    {field?.name}
                </div>
                <div className="reverse-calcs-list__item__content__result">
                    {result}
                </div>
            </div>
             {!isLast &&
                <div className="reverse-calcs-list__item__next">
                    או
                </div>
            }
        </div>
    )
}

export default ReverseCalcItem
