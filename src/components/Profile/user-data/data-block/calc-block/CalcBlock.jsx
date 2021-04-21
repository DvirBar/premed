import React, { useContext } from 'react'
import { useSelector } from 'react-redux'
import { GroupsContext } from '../GroupsContext'
import NoCalc from './NoCalc/NoCalc'
import SuggestedCalc from './SuggestedCalc/SuggestedCalc'

function CalcBlock({ calc, value, suggestedValue, payload }) {
    const {
        getErrorByCalc
    } = useContext(GroupsContext)

    const validError = useSelector(getErrorByCalc(calc._id))
    
    return (
        <div className="calc-block-new">
           {validError
           ?    <NoCalc 
                calcName={calc.name}
                validError={validError} />   
           :    <SuggestedCalc
                suggestedValue={suggestedValue}
                value={value} 
                calc={calc}
                payload={payload} />
           }
            
        </div>
    )
}

export default CalcBlock
