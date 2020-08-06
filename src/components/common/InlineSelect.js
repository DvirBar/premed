import React from 'react';
import PropTypes from 'prop-types';

function InlineSelect(props) {
    const options = props.options
    const [selected, setSelected] = [props.selected, props.setSelected];

    const changeSelected = option => {
        setSelected({ name: option.name, value: option._id })
    }

    return (
        <ul className="inline-select">
            {options.map(option => (
                <li 
                className="select-item"
                id={selected.value === option._id ? "selected" : ""} 
                onClick={() => changeSelected(option)}>
                    {option.name}
                </li>
            ))}
            
        </ul>
    )
}

InlineSelect.propTypes = {
    options: PropTypes.array.isRequired,
    selected: PropTypes.object.isRequired,
    setSelected: PropTypes.func.isRequired
}

export default InlineSelect
