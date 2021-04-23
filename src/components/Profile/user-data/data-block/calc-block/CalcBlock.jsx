import React, { useContext } from 'react'
import { useSelector } from 'react-redux'
import { hasCalcForYear } from '../../../../../redux/selectors/userdata'
import { GroupsContext } from '../GroupsContext'
import NoCalc from './NoCalc/NoCalc'
import NoCalcYear from './NoCalcYear/NoCalcYear'
import SuggestedCalc from './SuggestedCalc/SuggestedCalc'

function CalcBlock({ calc, value, suggestedValue, payload }) {
    const {
        getErrorByCalc
    } = useContext(GroupsContext)

    const validError = useSelector(getErrorByCalc(calc._id))

    const calcVersions = calc.versions
    const hasCalc = useSelector(hasCalcForYear(calcVersions, calcVersions?.tableGap))
    
    return (
        <div className="calc-block-new">
            {hasCalc 
            ? validError
                ?    <NoCalc 
                    calcName={calc.name}
                    validError={validError} />   
                :    <SuggestedCalc
                    suggestedValue={suggestedValue}
                    value={value} 
                    calc={calc}
                    payload={payload} />
            : <NoCalcYear />
            }
           {
           }
            
        </div>
    )
}

export default CalcBlock
