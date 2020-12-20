import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

function ToggleSwitch({ options, onChange, value, className }) {
    const [isChanging, setIsChanging] = useState(false);

    const handleChange = () => {
        let changeTo

        if(value === options[0].value) {
            changeTo = options[1].value
        }

        else {
            changeTo = options[0].value
        }

        onChange(changeTo)
        setIsChanging(false)
    }

    return (
        <p className={className 
            ?   "toggle-switch " + className
            :   "toggle-switch"}>
            <span>{options[1].name}</span>
            <span 
            className={value 
            ?   "toggle-button"
            :   "toggle-button no-value"} 
            onClick={() => handleChange()}>
                <span className={value
                ? value === options[1].value
                    ? "switch on"
                    : "switch"
                : "switch no-value" 
                
                }></span>
            </span>
            <span>{options[0].name}</span>
        </p>
    )
}

ToggleSwitch.propTypes = {
    options: PropTypes.array.isRequired,
    onChange: PropTypes.func.isRequired
}

export default ToggleSwitch