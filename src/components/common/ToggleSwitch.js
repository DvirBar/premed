import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

function ToggleSwitch({ options, onChange, value }) {
    const [selected, setSelected] = useState(false);
    const [isChanging, setIsChanging] = useState(false);

    useEffect(() => {
        setSelected(value)
    }, [value])

    const handleChange = () => {
        setIsChanging(true)
        setSelected(!selected)
    }


    useEffect(() => {
        if(isChanging) {
            onChange(selected)
            setIsChanging(false)
        }
    }, [selected])

    return (
        <p className="toggle-switch">
            <span>{options[1].name}</span>
            <span className="toggle-button" onClick={() => handleChange()}>
                <span className={selected
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