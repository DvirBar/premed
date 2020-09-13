import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

function InlineSelect({ selected, selectOption, options}) {

    // Default selection
    useEffect(() => {
        if(options && options.length !== 0)
            selectOption(options[0])
    }, [options])

    return (
        <div className="inline-select-wrapper">
            <ul className="inline-select">
                {options.map(option => (
                    <li 
                    className="select-item"
                    id={selected.value === option.value ? "selected" : ""} 
                    onClick={() => selectOption(option)}>
                        {option.name}
                    </li>
                ))}
            </ul>
        </div>
    )
}

InlineSelect.propTypes = {
    selected: PropTypes.object.isRequired,
    selectOption: PropTypes.func.isRequired,
    options: PropTypes.array.isRequired,
}

export default InlineSelect
