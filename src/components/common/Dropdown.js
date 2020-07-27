import React, { useState } from 'react'

const Dropdown = props => {
    const [display, setDisplay] = useState('none');
    const [selected, setSelected] = [props.selected, props.setSelected];
    const options = props.options;
    const handleChange = props.onChange;

    const ddShow = {
        display: display
    }

    const toggleDrop = () => {
        display === 'none' ?
        setDisplay('block') :
        setDisplay('none')
    }

    const event = new CustomEvent('changeSelected', {
         target: { name: props.name, value: selected.value }
        })

    const selectData = option => { // Assign selected option and close dropdown
        dispatchEvent(event);
        event.target.name = props.name;
        event.target.value = option.value;
        handleChange(event);
        setSelected({name: option.name, value: option.value})
        setDisplay('none')
    }

    return (
        <div className="dropdown">
            <span>{selected.name}</span>
            <span className="dropdown_toggler" onClick={toggleDrop}>&gt;</span>
            <ul className="dropdown_select" style={ddShow}>
                {options.map(option => 
                    <li onClick={() => selectData(option)}>{option.name}</li>
                    )}
            </ul>
        </div>
    )
}

export default Dropdown