import React from 'react'

function UrlInput({ url, onChange, name}) {
    return (
        <div className="url-input">     
            <input 
            type="text" 
            className="form-default"
            name={name}
            onChange={onChange}
            value={url}
            placeholder="כתובת" />

            {url &&
                <a 
                href={url} 
                target="_blank"
                rel="noopener noreferrer">בדיקת קישור</a>
            }               
        </div>
    )
}

export default UrlInput
