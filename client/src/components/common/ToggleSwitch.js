import React, { useState } from 'react';
import PropTypes from 'prop-types';

function ToggleSwitch({ 
    options, 
    onChange, 
    value, 
    className,
    disabled 
}) {
    const [selectedOption, setSelectedOption] = useState(value)

    const handleChange = () => {
        if(disabled) {
            return
        }

        let changeTo

        if(value === options[0].value) {
            changeTo = options[1].value
        }

        else {
            changeTo = options[0].value
        }
        
        setSelectedOption(changeTo)
        onChange(changeTo)
    }

    const isValueMissing = () => {
        const isFalse = !value && typeof value !== 'boolean'
        return isFalse
    }

    return (
        <p className={className 
            ?   "toggle-switch " + className
            :   "toggle-switch"}>
            <span>{options[1].name}</span>
            <span 
            className={`toggle-button 
                ${isValueMissing() ? 'no-value' : ''}
                ${disabled ? 'disabled' : ''}
            `} 
            onClick={() => handleChange()}>
                <span className={!isValueMissing()
                ? selectedOption === options[1].value
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