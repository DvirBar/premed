import React, { useState } from 'react'
import AcceptCalc from './AcceptCalc'
import CalcDetails from './CalcDetails/CalcDetails'
import OtherCalcs from './OtherCalcs/OtherCalcs'

function SuggestedCalc({ value, suggestedValue, calc, payload }) {
    const [displayInfo, setDisplayInfo] = useState(false)
    const [displayOther, setDisplayOther] = useState(false)
    
    return (
        <div className="suggested-calc">
            <div className="suggested-calc__info">
                <div className="suggested-calc__info__label">
                    הצעה:
                </div>
                <div className="suggested-calc__info__suggested-value">
                    {suggestedValue}
                </div>
                {payload &&
                    <div 
                    onClick={() => setDisplayInfo(true)}
                    className="suggested-calc__info__display-info">
                        פירוט
                    </div>
                }  
                {calc.reverseCalcs &&
                  <div className="other-calcs">
                        <span 
                        onClick={() => setDisplayOther(true)}
                        className="other-calcs__link">
                            עוד שקלולים
                        </span>
                        <OtherCalcs 
                        display={displayOther}
                        setDisplay={setDisplayOther}
                        calc={calc} />
                  </div>
                }
            </div>
            <AcceptCalc 
            calcId={calc?._id} 
            value={value} 
            suggestedValue={suggestedValue} />

            <CalcDetails
            display={displayInfo}
            setDisplay={setDisplayInfo}
            payload={payload}
            calcName={calc?.name} />
            
        </div>
    )
}

export default SuggestedCalc
