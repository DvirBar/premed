import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const Dropdown = ({ selected, options, name, title, onChange }) => {
    const [display, setDisplay] = useState(false);

    const toggleDrop = () => {
        setDisplay(!display)
    }

    const selectData = option => { // Assign selected option and close dropdown
        const data = {
            name: name,
            value: option.value
        }    
        onChange(data)
        setDisplay(false)
    }

    const paddingSelect = {
        padding: "0.5rem 0"
    }

    const defaultStyle = {}

    return (
        <div className="dropdown">
            <p 
            className="dropdown-main"
            onClick={() => toggleDrop()}>
                <span className="dropdown-top">{title}</span>
                <span className="dropdown-toggler">
                    <span className={display ? "arrow arrow-down" : "arrow"}></span>
                </span>
                <span className="dropdown-selected">{selected.name || ''}</span>
            </p>
            <ul 
            style={display ? paddingSelect : defaultStyle}
            className="dropdown-select" 
            id={display && "open"}>
            {options.map(option => 
                <li 
                onClick={() => selectData(option)}
                id={option.value === selected.value ? "selected" : ""}>
                    <span>{option.name}</span>
                    <i className="material-icons">done</i>
                </li>
                )}
            </ul>
        </div>
    )
}

Dropdown.propTypes = {
    selected: PropTypes.object.isRequired,
    options: PropTypes.array.isRequired,
    name: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
}

export default Dropdown