import React from 'react'

function AddStagedGroup({ changeDisplay }) {    
    return (
        <div 
        className="add-staged-group"
        onClick={() => changeDisplay(true)}>
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
