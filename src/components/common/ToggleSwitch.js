import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

function ToggleSwitch({ options, onChange, value }) {
    const [isChanging, setIsChanging] = useState(false);
    // Binded to value - used for optimistic updating
    const [isOn, setIsOn] = useState(false)

    useEffect(() => {
        if(value === options[1].value)
            setIsOn(true)

        else
            setIsOn(false)
    }, [value])

    const handleChange = () => {
        let changeTo

        if(value === options[0].value) {
            setIsOn(true)
            changeTo = options[1].value
        }

        else {
            setIsOn(false)
            changeTo = options[0].value
        }

        onChange(changeTo)
        setIsChanging(false)
    }

    return (
        <p className="toggle-switch">
            <span>{options[1].name}</span>
            <span className="toggle-button" onClick={() => handleChange()}>
                <span className={isOn
                ? "switch on" : "switch"}></span>
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