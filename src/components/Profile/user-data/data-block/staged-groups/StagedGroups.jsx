import React, { useContext, useState } from 'react'
import AddStagedGroup from './AddStagedGroup'
import ChooseStagedGroup from './ChooseStagedGroup'
import { GroupsContext } from '../GroupsContext';
import GroupsList from '../GroupsList'

function StagedGroups({ 
    groups, 
    getChildren }) {

    const [displayChooseStaged, setDisplayChooseStaged] = useState()
    const [selMultiGroup, setSelMultiGroup] = useState('')  
    const [displayCustom, setDisplayCustom] = useState(false)

    const {
        stagedGroupsList,
        addStagedGroup
    } = useContext(GroupsContext)

    const chooseGroup = group => {
        if(group.multiVals) {
            setSelMultiGroup(group._id)
            setDisplayCustom(true)            
        }

        else {
            addStagedGroup(group)
            setDisplayChooseStaged(false)
            setDisplayCustom(false)
        }
    }

    const changeDisplayChooseStaged = toggle => {
        setDisplayChooseStaged(toggle)
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

            <div 
            className="new-staged-groups">
                <AddStagedGroup 
                changeDisplay={changeDisplayChooseStaged} />
                
                <ChooseStagedGroup 
                chooseGroup={chooseGroup}
                display={displayChooseStaged}
                changeDisplay={changeDisplayChooseStaged}
                groups={groups}
                selMultiGroup={selMultiGroup}
                displayCustom={displayCustom} />
            </div>
        </div>
    )
}

export default StagedGroups
