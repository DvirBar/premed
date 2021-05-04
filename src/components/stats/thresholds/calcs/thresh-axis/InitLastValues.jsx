import React from 'react';
import PropTypes from 'prop-types';

function InitLastValues({ initValue, finalValue, color }) { 
    const style = {
        backgroundColor: color
    }

    return (
        <div style={style} className="init-last-values">
            {initValue &&
                <div>
                    <span className="init-last-values__value-label">
                        גל ראשון:&nbsp;
                    </span>
                    <span>{initValue}</span>
                </div>            
            }
            {finalValue &&
                <div>
                    <span className="init-last-values__value-label">
                        סכם סופי: &nbsp;
                    </span>
                    <span>{finalValue}</span>
                </div>
            
            }
        </div>
    )
}

InitLastValues.propTypes = {
    initValue: PropTypes.number,
    finalValue: PropTypes.number,
    color: PropTypes.string
}

export default InitLastValues
