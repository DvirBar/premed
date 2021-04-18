import React, { useContext } from 'react'
import { useSelector } from 'react-redux'
import { GroupsContext } from '../GroupsContext'
import NoCalc from './NoCalc/NoCalc'
import SuggestedCalc from './SuggestedCalc/SuggestedCalc'

function CalcBlock({ calc, value, suggestedAccepted }) {
    const {
        getErrorByCalc
    } = useContext(GroupsContext)

    const validError = useSelector(getErrorByCalc(calc._id))
    
    return (
        <div className="calc-block-new">
           {validError
           ?    <NoCalc />   
           :    <SuggestedCalc
                suggestedAccepted={suggestedAccepted}
                value={value} 
                calc={calc} />
           }
            
        </div>
    )
}

export default CalcBlock
