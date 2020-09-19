import React from 'react';

function ValidItem({ valid , validTypes }) {

    const validator = validTypes?.find(curValid => 
        curValid.value === valid.validType)

    return (
        <span className="valid-item">
            <span className="valid-name">
                {validator?.name}
            </span>
            {valid.validType === 'numRange' && 
                <span>

                    ({valid.min} -
                    {valid.max}) 
                </span>
            }
        </span>
    )
}

export default ValidItem
