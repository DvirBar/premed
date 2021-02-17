import React from 'react'

function GroupSum({ 
    threshes, 
    toggleDisplay, 
    display }) {
    return (
        <div 
        onClick={() => toggleDisplay(!display)}
        className="thresh-group-sum">
            <p 
            className="thresh-top">
                {(threshes[0].value).toFixed(3)}
            </p>
            <p
            className="thresh-bottom">
                {(threshes[threshes.length-1].value).toFixed(3)}
            </p>
        </div>
    )
}

export default GroupSum
