import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import useOnClickOutside from './useOnClickOutside';

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
            ((Object.keys(selected).length === 0 
            || selected.name === placeholder) && 
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

    const ref = useRef()
    useOnClickOutside(ref, display, () => setDisplay(false))
    const rect = ref.current?.getBoundingClientRect()
    const selectStyle = {
        top: rect?.top || 0,
        left: rect?.left || 0,
    }

    const widthStyle = {
        width
    }
    return (
        <div 
        className="dropdown" 
        ref={ref}
        style={width ? widthStyle : {}}>
            <fieldset
            className={`dropdown-main ${display ? 'focus' : ''}`}
            onClick={() => toggleDrop()}>
                <legend className="dropdown-title">{title}</legend>
                <p className="dropdown-selected">
                    <span>{selected?.name || ''}</span>
                    <span className="material-icons">
                        expand_more
                    </span>
                </p>
                
            </fieldset>
            {display &&
                <ul 
                style={selectStyle}
                className="dropdown-select" 
                id={display && "open"}>
                {options.map(option => 
                    <li
                    key={option.value}
                    onClick={() => selectData(option)}
                    className={option.forbidden && "forbidden-option"}
                    id={selected && option.value === selected.value ? "selected" : ""}>
                        <div className="option-container">
                            <span>{option.name}</span>
                        </div>
                    </li>
                    )}
                </ul>
            } 
            
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




export default Dropdown