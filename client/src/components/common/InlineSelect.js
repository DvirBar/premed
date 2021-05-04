import React from 'react';
import PropTypes from 'prop-types';

function InlineSelect({ selected, selectOption, options}) {
    if(!selected) {
        selectOption(options[0])
    }
    return (
        <ul className="inline-select">
            {options.map(option => (
                <li 
                className={selected === option.value
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
    selected: PropTypes.string.isRequired,
    selectOption: PropTypes.func.isRequired,
    options: PropTypes.array.isRequired,
}

export default InlineSelect
