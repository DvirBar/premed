import React from 'react';
import PropTypes from 'prop-types';

function FormInput({ label, type, name, value, onChange, error }) {
    return (
        <div className={error ? "form-text-input error" : "form-text-input"}>
            <input
            type={type || "text"}
            className="text-input"
            placeholder="pseudo"
            name={name || ''} 
            id={name || ''}
            value={value || ''}
            onChange={onChange}
            />
            <label for={name || ''} className="label">{label}</label>
            {error &&
                <p className="error">{error}</p>
            }
        </div>
    )
}

FormInput.propTypes = {
    label: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func,
    error: PropTypes.string
}

export default FormInput
