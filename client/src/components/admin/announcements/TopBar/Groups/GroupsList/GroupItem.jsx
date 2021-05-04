import React from 'react'
import GroupOptions from './GroupOptions/GroupOptions'

function GroupItem({ group }) {
    return (
        <div className="group-item">
            <div className="group-item__details">
                <span
                className="group-item__details__name">
                    {group.name}
                </span>
                <span  
                className="group-item__details__sub-count">
                    {`${group.subCount} רשומים`}
                </span>
            </div>
            <GroupOptions groupId={group._id} />
        </div>
    )
}

export default GroupItem
