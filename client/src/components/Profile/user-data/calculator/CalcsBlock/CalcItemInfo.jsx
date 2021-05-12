import React, { useContext} from 'react'
import { Fragment } from 'react'
import CalcDetails from '../../data-block/calc-block/SuggestedCalc/CalcDetails/CalcDetails'
import PayloadInfo from '../../data-block/calc-block/SuggestedCalc/CalcDetails/PayloadInfo/PayloadInfo'
import OtherCalcs from '../../data-block/calc-block/SuggestedCalc/OtherCalcs/OtherCalcs'
import OtherCalcsContent from '../../data-block/calc-block/SuggestedCalc/OtherCalcs/OtherCalcsContent/OtherCalcsContent'
import { CalculatorContext } from '../CalculatorContext'

function CalcItemInfo() {
    const {
        values
    } = useContext(CalculatorContext)
    
    const {
        calcValue,
        calc,
        display
    } = values

    if(display) {
        return (
            <div className="calc-more-info-wrapper scrollbar-main">
                <div className="calc-more-info">
                {calcValue?.payload &&
                    <PayloadInfo
                    payload={calcValue.payload} />
                } 
                {(calc?.versions || calc?.reverseCalcs) &&
                    <OtherCalcsContent
                    calc={calc} />
                }
            </div>
            </div>
            
        )        
    }

    else return <Fragment></Fragment>

}

export default CalcItemInfo
