import React, { useContext } from 'react'
import { useSelector } from 'react-redux'
import { GroupsContext } from '../../../../GroupsContext'
import ReverseCalcItem from './ReverseCalcItem'

function ReverseCalcsList({ calc, year, threshold }) {
    const {
        selectFieldValues
    } = useContext(GroupsContext)
    
    // Get relevant fields values
    const fieldsValues = useSelector(selectFieldValues(calc.reverseCalcs))

    return (
        <div className="reverse-calcs-list">
            {(calc.calcRecog && fieldsValues) &&
                fieldsValues.map(fieldValue => 
                    <ReverseCalcItem 
                    fieldValue={fieldValue}
                    threshold={threshold}
                    fieldsValues={fieldsValues}
                    year={year}
                    calc={calc} />
                ) 
            }
        </div>
    )
}

export default ReverseCalcsList
