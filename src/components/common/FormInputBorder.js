import React, { Fragment, useState, useEffect } from 'react'

function FormInputBorder({ title, type, name, value, onChange, 
    onBlur, error, disabled }) {

    const [displayError, setDisplayError] = useState(false)

    useEffect(() => {
        if(error && error.length !== 0) {
            setDisplayError(true)
        }

        else {
            setDisplayError(false)
        }
    }, [value, error])

    return (
        <Fragment>
            <fieldset className={error 
            ? "form-input-border error" 
            : "form-input-border"}>
                <legend>{title}</legend>
                <input 
                type={type}
                className="text-input" 
                name={name || ''}
                value={value || ''}
                onChange={onChange}
                onBlur={onBlur}
                autoComplete="off"
                disabled={disabled} />
            </fieldset>
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
        </Fragment>
    )
}

export default FormInputBorder
