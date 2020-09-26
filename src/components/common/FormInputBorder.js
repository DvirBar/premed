import React, { Fragment } from 'react'

function FormInputBorder({ title, type, name, value, onChange, 
    onBlur, error, disabled }) {

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
            {error &&
                <p className="field-error">
                    {error}
                </p>
            }
        </Fragment>
    )
}

export default FormInputBorder
