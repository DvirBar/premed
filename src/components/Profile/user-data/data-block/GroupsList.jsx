import React, { Fragment } from 'react'
import GroupFields from './GroupFields'

function GroupsList({ group, groups, getChildren }) {
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
                    getChildren={getChildren}/>
                </Fragment>)
            
            :   <GroupFields
                group={group} />
            }
        </div>
    )
}

export default GroupsList
