import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import IconsObj from '../../../../libraries/IconsMap';

function IconsSelect({ value, onChange }) {
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
                className={name === value
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
