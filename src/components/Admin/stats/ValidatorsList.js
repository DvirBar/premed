import React from 'react'
import ValidDetails from './ValidDetails'

function ValidatorsList({ fieldValids, types, field }) {
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
