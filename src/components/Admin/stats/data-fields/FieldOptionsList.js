import React, { useState, Fragment } from 'react'

function FieldOptionsList({ onChange, values, name }) {
    const [newOption, setNewOption] = useState('')
    
    const toggleOption = value => {
        onChange({
            name: name,
            value: value,
            type: 'multiValue'
        })
    }
    
    const addOption = e => {
        if(e.key === "Enter") {
            if(newOption !== '') {
                toggleOption(newOption);
                setNewOption('');
            }
        }
    }

    return (
        <ul className="field-options-list">
            {values && values.length !== 0 
            ? (
                <Fragment>
                    {values.map(value =>
                        <li key={value}>
                            <span>{value}</span>
                            <i 
                            className="material-icons"
                            onClick={() => toggleOption(value)}>
                                close
                            </i>
                        </li>
                    )}
                </Fragment>
            )
            : <li className="no-options">אין אפשרויות</li>
            }
            <li>
                <input 
                type="text"
                className="form-default"
                placeholder="אפשרות חדשה..."
                value={newOption}
                onChange={e => setNewOption(e.target.value)}
                onKeyPress={e => addOption(e)} />
            </li>
        </ul>
    )
}

export default FieldOptionsList
