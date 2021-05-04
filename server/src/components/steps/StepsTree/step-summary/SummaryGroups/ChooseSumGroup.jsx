import React from 'react'

function ChooseSumGroup({ 
    groups, 
    selectGroup, 
    display }) {

    return (
        <div 
        className={`choose-sum-group
        ${display ? 'display' : ''}`}>
            {groups.map(group =>
                <div 
                key={group._id}
                onClick={() => selectGroup(group)}
                className="choose-sum-item">
                    {group.name}
                </div>
            )}
        </div>
    )
}

export default ChooseSumGroup
