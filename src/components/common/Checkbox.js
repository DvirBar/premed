import React, { useEffect, useState } from 'react'

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

    // useEffect(() => {
    //     if(isChanging) {
    //         let dataObj = {
    //             name,
    //             value: isChecked 
    //             ? (typeof value.on !== "undefined"
    //                 ? value.on : value)
    //             : (typeof value.off !== "undefined"
    //                 ? value.off : value)
    //         }
    
    //         if(isMulti)
    //             dataObj.type = "multiValue"
    
    //         onChange(dataObj)
    //     }
    // }, [isChanging, isChecked])

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
                <i className="material-icons">
                    done
                </i>
            </div>
            <div className="checkbox-label">
                {label}
            </div>
        </div>
    )
}

export default Checkbox
