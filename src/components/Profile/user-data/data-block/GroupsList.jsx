import React, { Fragment } from 'react'
import { removeValue } from '../../../../redux/actions/userdata'
import GroupFields from './GroupFields'

function GroupsList({ 
    group, 
    groups, 
    getChildren, 
    isStaged,
    removeStagedGroup }) {
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
                    isStaged={isStaged}
                    removeStagedGroup={removeStagedGroup} />
                </Fragment>)
            
            :   <GroupFields
                group={group}
                isStaged={isStaged}
                removeStagedGroup={removeStagedGroup} />
            }
        </div>
    )
}

export default GroupsList
