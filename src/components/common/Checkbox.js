import React, { useEffect, useState } from 'react'

function Checkbox({ 
    name, 
    label, 
    value, 
    onChange, 
    checked, 
    isMulti }) {
    const check = () => {
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
        <div className="checkbox-elem">
             <div 
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
