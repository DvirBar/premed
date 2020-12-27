import React, { useContext, useState } from 'react'
import AddCustomGroup from './AddCustomGroup';
import AddStagedGroup from './AddStagedGroup'
import ChooseStagedGroup from './ChooseStagedGroup'
import { GroupsContext } from './GroupsContext';
import GroupsList from './GroupsList'

function StagedGroups({ 
    groups, 
    getChildren }) {
    const statuses = {
        addButton: 'addButton',
        choose: 'choose',
        addGroup: 'addGroup',
    }

    const [displayStatus, setDisplayStatus] = useState(statuses.addButton)
    const [selMultiGroup, setSelMultiGroup] = useState('')  

    const {
        stagedGroupsList,
        addStagedGroup
    } = useContext(GroupsContext)

    const chooseGroup = chosenGroup => {
        const group = groups.find(group => 
            group._id === chosenGroup.value)
        
        if(group.multiVals) {
            setSelMultiGroup(group._id)
            setDisplayStatus(statuses.addGroup)
        }

        else {
            addStagedGroup(group)
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
                getChildren={getChildren}
                isStaged={true} />
            )}

            <div className="staged-groups-choose">
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
                
                {displayStatus !== statuses.addButton &&
                    <span
                    onClick={() => changeDisplayStatus(statuses.addButton)}
                    className='cancel-new-group'>
                        ביטול
                    </span>
                }
            </div>
        </div>
    )
}

export default StagedGroups
