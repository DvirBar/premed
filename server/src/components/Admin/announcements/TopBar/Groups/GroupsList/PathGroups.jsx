import React from 'react'
import { useSelector } from 'react-redux'
import { getGroupsByPath } from '../../../../../../redux/announcements/groups/selectors'
import GroupItem from './GroupItem'

function PathGroups({ path }) {
    const groups = useSelector(getGroupsByPath(path._id))
    
    return (
        <div className="path-groups">
            <div className="path-name">
                {path.name}
            </div>
            <div className="path-groups__list">
                {groups.map(group => 
                    <GroupItem 
                    key={group._id}
                    group={group} />    
                )}
            </div>
        </div>
    )
}

export default PathGroups
