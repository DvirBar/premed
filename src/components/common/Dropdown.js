import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const Dropdown = ({ selected, options, name, title, onChange }) => {
    const [display, setDisplay] = useState(false);

    const toggleDrop = () => {
        setDisplay(!display)
    }

    const event = new CustomEvent('changeSelected', {
         target: { name: name, value: selected.value }
        })

    const selectData = option => { // Assign selected option and close dropdown
        dispatchEvent(event);
        event.target.name = name;
        event.target.value = option.value;
        onChange(event, option.name)
        setDisplay(false)
    }  

    return (
        <div className="dropdown">
            <span>{selected.name || title}</span>
            <span className="dropdown_toggler" onClick={() => toggleDrop()}>&gt;</span>
            {display &&
                <ul className="dropdown_select">
                {options.map(option => 
                    <li onClick={() => selectData(option)}>{option.name}</li>
                    )}
                </ul>
            }
        </div>
    )
}

Dropdown.propTypes = {
    selected: PropTypes.object.isRequired,
    options: PropTypes.array.isRequired,
    name: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired
}

export default Dropdown