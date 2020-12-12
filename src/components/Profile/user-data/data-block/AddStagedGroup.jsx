import React from 'react'

function AddStagedGroup({ changeStatus, statuses }) {
    return (
        <div 
        className="add-staged-group"
        onClick={() => changeStatus(statuses.choose)}>
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
