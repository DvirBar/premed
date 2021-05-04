import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

function TextArea({ rows, cols, placeholder, name, value, onChange,
error }) {

    
    return (
        <div className="textarea-input">
            <textarea
            className={error && "error"}
            cols={cols} rows={rows}
            placeholder={placeholder}
            name={name}
            value={value}
            onChange={onChange} />

            {error && 
                <p className="text-area-error">
                    {error}
                </p>
            }
        </div>
    )
}

TextArea.propTypes = {
    rows: PropTypes.string.isRequired,
    cols: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    error: PropTypes.string.isRequired
}

export default TextArea
