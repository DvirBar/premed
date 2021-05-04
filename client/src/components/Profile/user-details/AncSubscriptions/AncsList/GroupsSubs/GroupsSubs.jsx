import React from 'react'
import Checkbox from '../../../../../common/Checkbox'

function GroupsSubs({ groups, toggleSubGroup }) {
    return (
        <div className="path-groups__groups-subs">
            {groups.map(group => 
                <Checkbox 
                key={group._id}
                label={group.name}
                onChange={() => toggleSubGroup(group)}
                checked={group.subscriptions} />    
            )}
        </div>
    )
}

export default GroupsSubs
