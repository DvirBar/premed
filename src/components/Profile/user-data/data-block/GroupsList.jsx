import React, { Fragment } from 'react'
import GroupFields from './GroupFields'

function GroupsList({ 
    group, 
    groups, 
    getChildren, 
    isStaged }) {
    return (
        <div className="groups-list">
            {groups.length !== 0 
            ?   groups.map(group => 
                <Fragment>
                    <p className="parent-group-title">
                        {group.name}
                    </p>
                    <GroupsList
                    key={group._id}
                    group={group}
                    groups={getChildren(group)}
                    getChildren={getChildren}
                    isStaged={isStaged} />
                </Fragment>)
            
            :   <GroupFields
                group={group}
                isStaged={isStaged} />
            }
        </div>
    )
}

export default GroupsList
