import React from 'react'
import ValidDetails from './ValidDetails'

function ValidatorsList({ fieldValids, types, field }) {

    if(fieldValids.length === 0)
        return <p className="no-resource-error">
            אין מאמתים לשדה זה
        </p>

    else 
        return (
            <div className="valid-list">
                {fieldValids?.map(valid => 
                    <ValidDetails 
                    key={valid._id}
                    valid={valid}
                    types={types}
                    field={field}
                    />)}
            </div>
        )
}

export default ValidatorsList
