import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

function Switch(props) {
    const option1 = props.option1;
    const option2 = props.option2;
    const [selected, setSelected] = [props.selected, props.setSelected];

    const handleChange = () => {
        if(selected.value === option1.value)
            setSelected(option2)
    
        else
            setSelected(option1)
    }

    return (
        <p className="degree-toggle">
            <span>{option2.name}</span>
            <label className="toggle">
                <input 
                type="checkbox" 
                value={selected} 
                onChange={() => handleChange()} />
                <span className="toggle-button"></span>
            </label>
            <span>{option1.name}</span>
        </p>
    )
}

Switch.propTypes = {
    option1: PropTypes.object.isRequired,
    option2: PropTypes.object.isRequired,
    selected: PropTypes.object.isRequired,
    setSelected: PropTypes.func.isRequired
}

export default Switch