import React, { useContext } from 'react'
import { useSelector } from 'react-redux'
import { getTableYear } from '../../../../../../../../redux/selectors/userdata'
import { GroupsContext } from '../../../../GroupsContext'
import calculateLastYear from './calculateLastYear'

function LastYearCalc({ calc, year }) {
    const {
        selectFieldValues,
        selectFieldValue
    } = useContext(GroupsContext)

    const tableYear = useSelector(getTableYear)
    // Get relevant fields values
    const fieldsValues = useSelector(selectFieldValues(calc.reverseCalcs))

    const result = calculateLastYear(
        fieldsValues, 
        calc.calcRecog, 
        year, 
        calc.fractionDigits)

    const calcCurrentValue = useSelector(selectFieldValue(calc._id))?.suggestValue
    if(year !== tableYear) {
        return (
            <div className="year-calc">
                <div className="year-calc__name">
                    סכם בשנה שעברה:
                </div>
                <div className="year-calc__value">
                    {result}
                </div>
            </div>
        )
    }

    
    return (
        <div className="year-calc">
            <div className="year-calc__name">
                סכם בשנה זו:
            </div>
            <div className="year-calc__value">
                {calcCurrentValue}
            </div>
        </div>
    )
    
}

export default LastYearCalc
