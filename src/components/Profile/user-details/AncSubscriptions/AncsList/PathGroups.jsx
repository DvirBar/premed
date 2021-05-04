import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Checkbox from '../../../../common/Checkbox'
import { getGroupsByPath } from '../../../../../redux/announcements/groups/selectors'
import { isAllChecked } from './utils'
import { groupChangeSub } from '../../../../../redux/announcements/groups/actions'
import GroupsSubs from './GroupsSubs/GroupsSubs'

function PathGroups({ path }) {
    const groups = useSelector(getGroupsByPath(path._id))
    const dispatch = useDispatch()

    const toggleSubGroup = group => {
        let sub
        if(!group.subscriptions) {
            sub = ["email"]
        }

        dispatch(groupChangeSub(group._id, sub))        
    }

    const selectAllGroups = () => {
        const allChecked = isAllChecked(groups) 
        const sub = allChecked ? undefined : ["email"] 
       
        for(let group of groups) {
            if(allChecked 
                ? group.subscriptions : !group.subscriptions) {
                    console.log("hi");
                dispatch(groupChangeSub(group._id, sub))
            }
        }
    }

    return (
        <div className="path-groups">
            <Checkbox
            label={path.name}
            onChange={selectAllGroups}
            checked={isAllChecked(groups)} />
            <GroupsSubs 
            groups={groups}
            toggleSubGroup={toggleSubGroup} />
        </div>
    )
}

export default PathGroups
