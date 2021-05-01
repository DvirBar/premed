import React, { useEffect, useState } from 'react'

function BorderTextbox({ 
    type, 
    value, 
    placeholder, 
    onChange, 
    onBlur, 
    error,
    status }) {
    const [displayError, setDisplayError] = useState(false)

    useEffect(() => {
        if(error && error.length !== 0) {
            setDisplayError(true)
        }

        else {
            setDisplayError(false)
        }
    }, [value, error])

    const statusComponent = () => {
        
    }

    return (
        <div className="border-textbox">
            <input 
            type={type} 
            className={error
            ? "form-default error"
            : "form-default"}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            placeholder={placeholder} />
            <span className={displayError 
            ? "input-error display"
            : "input-error"}>
                <i 
                className="material-icons"
                onClick={() => setDisplayError(false)}>
                    close
                </i>
                <span>{error}</span>
            </span>
        </div>
    )
}

export default BorderTextbox
