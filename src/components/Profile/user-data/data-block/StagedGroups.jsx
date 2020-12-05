import React, { useState } from 'react'
import AddStagedGroup from './AddStagedGroup'
import ChooseStagedGroup from './ChooseStagedGroup'
import GroupsList from './GroupsList'
import StagedGroupsList from './StagedGroupsList'

function StagedGroups({ groups, getChildren }) {
    const [displayChoose, setDisplayChoose] = useState(false)
    const [stagedGroupsList, setStagedGroupsList] = useState([])

    const chooseGroup = chosenGroup => {
        const group = groups.find(group => 
            group._id === chosenGroup.value)

        setStagedGroupsList([...stagedGroupsList, group])
        setDisplayChoose(false)
    }

    const toggleDisplay = toggle => {
        setDisplayChoose(toggle)
    }

    return (
        <div className="staged-groups">
            {stagedGroupsList.map(group =>
                <GroupsList
                group={group}
                groups={getChildren(group)}
                getChildren={getChildren} />
            )}

            {displayChoose
            ?   <ChooseStagedGroup 
                chooseGroup={chooseGroup}
                groups={groups} />
            :   <AddStagedGroup 
                // onClick={() => setDisplayChoose(true)}
                toggleDisplay={toggleDisplay} 
                />
            }
        </div>
    )
}

export default StagedGroups
