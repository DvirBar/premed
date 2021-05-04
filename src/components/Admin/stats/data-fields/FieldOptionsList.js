import React, { useState, Fragment, useEffect } from 'react'

function FieldOptionsList({ onChange, values, name }) {
    const [newName, setNewName] = useState('')
    const [newValue, setNewValue] = useState('')
    const [addDisabled, setAddDisabled] = useState(true)
    
    const addOption = () => {
        const event = {
            name,
            value: {
                name: newName,
                value: newValue
            },
            type: 'multiValue',
            action: 'add'
        }

        onChange(event)
    }

    const removeOption = value => {
        const event = {
            name,
            value: {
                value: value
            },
            unique: 'value',
            action: 'remove'
        }

        onChange(event)
    }

    useEffect(() => {
        if(newValue.length > 0 && newName.length > 0) {
            setAddDisabled(false)
        }
        else {
            setAddDisabled(true)
        }
    }, [newValue, newName])
    
    return (
        <ul className="field-options-list">
            {values && values.length !== 0 
            ? (
                <Fragment>
                    {values.map(value =>
                        <li key={value.value}>
                            <span>{value.name}</span>
                            <span className="option-value">
                                {value.value}
                            </span>
                            <i 
                            className="material-icons"
                            onClick={() => removeOption(value)}>
                                close
                            </i>
                        </li>
                    )}
                </Fragment>
            )
            : <li className="no-options">אין אפשרויות</li>
            }
            <li className="form-new-option">
                <input 
                type="text"
                className="form-default"
                style={{ width: '10rem' }}
                placeholder="שם"
                value={newName}
                onChange={e => setNewName(e.target.value)} />

                <input 
                type="text"
                className="form-default"
                style={{ width: '10rem' }}
                placeholder="ערך"
                value={newValue}
                onChange={e => setNewValue(e.target.value)} />

                <div 
                className="insert-option"
                disabled={addDisabled}
                onClick={() => addOption()}>
                    +
                </div>
            </li>
        </ul>
    )
}

export default FieldOptionsList
