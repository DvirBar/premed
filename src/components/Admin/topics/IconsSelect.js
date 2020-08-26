import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import IconsObj from '../../topics/IconsMap';

function IconsSelect({ value, onChange }) {
    const [selected, setSelected] = useState(value)

    useEffect(() => {
        setSelected(value)
    }, [value])

    const changeSelected = name => {
        let iconValue = {
            name: 'icon',
            value: name
        }

        onChange(iconValue)
    }
    
    return (
        <div className="icons-select">
            {Object.keys(IconsObj).map((name, i) => (
                <div 
                className={name === selected
                ? "icon-item selected"
                : "icon-item"}
                key={i}
                onClick={() => changeSelected(name)}>
                    <img src={IconsObj[name]} />
                </div>
            ))}
        </div>
    )
}

IconsSelect.propTypes = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired
}

export default IconsSelect
