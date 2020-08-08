import React from 'react';
import PropTypes from 'prop-types';

function FormInput({ label, name, value, onChange, error }) {
    return (
        <p className={error ? "form-text-input error" : "form-text-input"}>
            <input
            type="text"
            className="text-input"
            placeholder="pseudo"
            name={name || ''} 
            value={value || ''}
            onChange={onChange}
            />
            <label className="label">{label}</label>
            {error &&
                <p className="error">{error}</p>
            }
        </p>
    )
}

FormInput.propTypes = {
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func,
    error: PropTypes.string
}

export default FormInput
