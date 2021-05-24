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
            <div>
                עם הנתונים שהזנתם ניתן להגיע לסכם עם כל אחת מהאפשרויות הבאות:
            </div>
            {(calc.calcRecog && fieldsValues) &&
                fieldsValues.map((fieldValue, index) => 
                    <ReverseCalcItem 
                    key={index}
                    isLast={index === fieldsValues.length -1}
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
