import React from 'react'
import ValidItem from '../ValidItem'

function ShortValidList({ fieldValids, validTypes }) {
    if(fieldValids?.length === 0)
        return <p>אין מאמתים</p>
    
    return (
        <div className="valid-short">
            {fieldValids?.map(valid =>
                <ValidItem 
                key={valid._id}
                valid={valid}
                validTypes={validTypes} />)}
        </div>
    )
}

export default ShortValidList
