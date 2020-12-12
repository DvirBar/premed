import React, { useState } from 'react'
import AddCustomGroup from './AddCustomGroup';
import AddStagedGroup from './AddStagedGroup'
import ChooseStagedGroup from './ChooseStagedGroup'
import GroupsList from './GroupsList'
import StagedGroupsList from './StagedGroupsList'

function StagedGroups({ groups, getChildren }) {
    const statuses = {
        addButton: 'addButton',
        choose: 'choose',
        addGroup: 'addGroup',
    }
    const [displayStatus, setDisplayStatus] = useState(statuses.addButton)
    const [selMultiGroup, setSelMultiGroup] = useState('')
    const [stagedGroupsList, setStagedGroupsList] = useState([])

    const chooseGroup = chosenGroup => {
        const group = groups.find(group => 
            group._id === chosenGroup.value)
        
        if(group.multiVals) {
            setSelMultiGroup(group._id)
            setDisplayStatus(statuses.addGroup)
        }

        else {
            setStagedGroupsList([...stagedGroupsList, group])
            setDisplayStatus(statuses.addButton)
        }
    }

    const changeDisplayStatus = status => {
        setDisplayStatus(status)
    }

    return (
        <div className="staged-groups">
            {stagedGroupsList.map(group =>
                <GroupsList
                group={group}
                groups={getChildren(group)}
                getChildren={getChildren} />
            )}

            {displayStatus === statuses.addButton &&
                <AddStagedGroup 
                changeStatus={changeDisplayStatus}
                statuses={statuses} />
            }

            {displayStatus === statuses.choose &&
                <ChooseStagedGroup 
                chooseGroup={chooseGroup}
                groups={groups} />
            }
            
            {displayStatus === statuses.addGroup &&
                <AddCustomGroup
                changeStatus={changeDisplayStatus}
                statuses={statuses}
                selMultiGroup={selMultiGroup} />
            }
        </div>
    )
}

export default StagedGroups
