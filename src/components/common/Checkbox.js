import React, { useEffect, useState } from 'react'

function Checkbox({ name, label, value, values, onChange, checked, isMulti }) {
    const [isChecked, setIsChecked] = useState(checked || false);
    const [isChanging, setIsChanging] = useState(false)

    useEffect(() => {
        if(typeof checked !== "undefined")
            setIsChecked(checked)
    }, [checked])

    const check = () => {
        setIsChecked(!isChecked)
        setIsChanging(true)
    }

    useEffect(() => {
        if(isChanging) {
            let dataObj = {
                name,
                value: isChecked 
                ? (typeof value.on !== "undefined"
                    ? value.on : value)
                : (typeof value.off !== "undefined"
                    ? value.off : value)
            }
    
            if(isMulti)
                dataObj.type = isMulti
    
            onChange(dataObj)
        }
    }, [isChanging, isChecked])

    return (
        <div className="checkbox-elem">
             <div 
            className={isChecked
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
