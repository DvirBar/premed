import React from 'react'
import Done from '@material-ui/icons/Done'

function Checkbox({ 
    name, 
    label, 
    value, 
    onChange, 
    checked, 
    isMulti,
    disabled,
    style }) {
    const check = () => {
        if(!disabled) {
            if(name) {
                let dataObj = {}
    
                if(isMulti) {
                    dataObj = {
                        name,
                        value: value,
                        type: "multiValue"
                    }    
                }
    
                else {
                    dataObj = {
                        name,
                        value: !checked
                    }
                }
    
                onChange(dataObj)
            }
            
            else {
                onChange(!checked)
            }
        }
    }

    const styling = {
        backgroundImage: `linear-gradient(${style?.color},${style?.color})` || '',
        borderColor: style?.color || '',
        borderRadius: style?.round ? '50%' : '',
        width: style?.size || '',
        height: style?.size || ''
    }

    return (
        <div 
        className={`checkbox-elem 
        ${disabled ? '' : 'enabled'}`}>
            <div 
            style={styling}
            className={checked
                ? "checkbox checked"
                : "checkbox"}
            onClick={() => check()}>
                {checked &&
                    <Done />
                }
            </div>
            <div className="checkbox-label">
                {label}
            </div>
        </div>
    )
}

export default Checkbox
