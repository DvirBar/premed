import React from 'react'

function AddStagedGroup({ toggleDisplay }) {
    return (
        <div 
        className="add-staged-group"
        onClick={() => toggleDisplay(true)}>
            <i className="material-icons add">
                add
            </i>
            <span className="button-name">
                הוספת מקצוע
            </span>
        </div>
    )
}

export default AddStagedGroup
