import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const Dropdown = ({ options, defaultOption, name, title, 
    onChange, placeholder, uniqueListKey, width }) => {
    const [display, setDisplay] = useState(false);
    const [selected, setSelected] = useState({})
    const toggleDrop = () => {
        setDisplay(!display)
    }

    // Set initial dropdown values, only if selected is an empty object
    useEffect(() => { 
        if(selected && 
            ((Object.keys(selected).length === 0 || selected.name === placeholder) && 
            (defaultOption || placeholder))) {
                const placeholderObj = { name: placeholder }
                setSelected(defaultOption || placeholderObj || options[0])
        }
    }, [placeholder, defaultOption, options])


    const selectData = option => { // Assign selected option and close dropdown
        if(!option.forbidden) {
            setSelected(option)
            const data = {
                name: name,
                value: option.value,
                type: option.type,
                key: uniqueListKey
            }
            onChange(data)
            setDisplay(false)
        }
    }

    const widthStyle = {
        width: width
    }

    return (
        <div className="dropdown" style={width ? widthStyle : {}}>
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
                className={option.forbidden && "forbidden-option"}
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
    placeholder: PropTypes.string,
    uniqueListKey: PropTypes.string
}


const paddingSelect = {
    padding: "0.5rem 0"
}

const defaultStyle = {}



export default Dropdown