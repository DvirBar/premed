import React, { useState } from 'react';
import DeleteValid from './DeleteValid';

function ValidDetails({ valid , types, field }) {
    const validator = types.validationTypes?.find(curValid => 
        curValid.value === valid.validType)


    return (
        <div className="valid-details">
            <DeleteValid
            valid={valid}
            fieldId={field._id} />
            <div className="details-block">
                <span className="valid-name">
                {validator?.name}
                </span>
                <span className="valid-desc">
                    {validator?.description}
                </span>
                {valid.validType === 'numRange' && 
                    <p className="min-max-value">
                        <span>מינימום: {valid.min}</span>
                        <span>מקסימום: {valid.max}</span>
                    </p>
                }
            </div>
        </div>
    )
}

export default ValidDetails
