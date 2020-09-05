import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const Dropdown = ({ options, defaultOption, name, title, onChange, placeholder }) => {
    const [display, setDisplay] = useState(false);
    const [selected, setSelected] = useState({})
    const toggleDrop = () => {
        setDisplay(!display)
    }

    // Set initial dropdown values, only is selected is empty object
    useEffect(() => { 
        if(selected && 
            (Object.keys(selected).length === 0 || defaultOption)) {
            setSelected(placeholder || defaultOption || options[0])
        }
    }, [placeholder, defaultOption, options])

    const selectData = option => { // Assign selected option and close dropdown
        setSelected(option)
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
                <span className="dropdown-selected">{selected?.name || ''}</span>
            </p>
            <ul 
            style={display ? paddingSelect : defaultStyle}
            className="dropdown-select" 
            id={display && "open"}>
            {options.map(option => 
                <li
                key={option.value}
                onClick={() => selectData(option)}
                id={selected && option.value === selected.value ? "selected" : ""}>
                    <span>{option.name}</span>
                    <i className="material-icons">done</i>
                </li>
                )}
            </ul>
        </div>
    )
}

Dropdown.propTypes = {
    options: PropTypes.array.isRequired,
    defaultOption: PropTypes.object,
    name: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    placeholder: PropTypes.string
}

export default Dropdown