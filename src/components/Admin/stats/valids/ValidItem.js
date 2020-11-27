import React from 'react';

function ValidItem({ valid }) {
    return (
        <span className="valid-item">
            <span className="valid-name">
                {valid.name}
            </span>
            {valid.value.value === 'numRange' && 
                <span>
                    ({valid.min} -
                    {valid.max}) 
                </span>
            }
        </span>
    )
}

export default ValidItem
