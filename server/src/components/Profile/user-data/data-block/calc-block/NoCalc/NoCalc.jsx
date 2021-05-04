import { Help } from '@material-ui/icons'
import React, { useState } from 'react'
import DisplayValidError from './DisplayValidError/DisplayValidError'

function NoCalc({ calcName, validError }) {
    const [display, setDisplay] = useState(false)
    return (
        <div className="no-calc">
           <div className="no-calc__text">
                אין מספיק נתונים 
           </div>
           <div 
           onClick={() => setDisplay(true)}
           className="no-calc__help">
                <Help />
           </div>

           <DisplayValidError
           title={calcName}
           display={display}
           setDisplay={setDisplay}
           error={validError} />

        </div>
    )
}

export default NoCalc
