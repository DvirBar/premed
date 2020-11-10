import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

function InlineSelect({ selected, selectOption, options}) {

    // Default selection
    useEffect(() => {
        if(options && options.length !== 0)
            selectOption(options[0])
    }, [options])

    return (
        <ul className="inline-select">
            {options.map(option => (
                <li 
                className={selected.value === option.value
                ?   "select-item selected"
                :   "select-item"}
                onClick={() => selectOption(option)}>
                    {option.name}
                </li>
            ))}
        </ul>
    )
}

InlineSelect.propTypes = {
    selected: PropTypes.object.isRequired,
    selectOption: PropTypes.func.isRequired,
    options: PropTypes.array.isRequired,
}

export default InlineSelect
