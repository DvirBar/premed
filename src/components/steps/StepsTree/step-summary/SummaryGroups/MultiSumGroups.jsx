import React, { useEffect, useState } from 'react'
import { isObjEmpty } from '../../../../../utils/objects'
import ChooseSumGroup from './ChooseSumGroup'
import SummaryGroupItem from './SummaryGroupItem'

function MultiSumGroups({ 
    displayGroups, 
    groups, 
    stepId, 
    sumId }) {
        
    const [displayChoose, setDisplayChoose] = useState(false)
    const [chosenGroup, setChosenGroup] = useState({})
    
    useEffect(() => {
        setChosenGroup({})
        setDisplayChoose(displayGroups)
    }, [displayGroups])

    const selectGroup = group => {
        setChosenGroup(group)
    }

    useEffect(() => {
        if(!isObjEmpty(chosenGroup)) {
            setDisplayChoose(false)
        }
    }, [chosenGroup])

    const openChoose = () => {
        setDisplayChoose(true)
        setChosenGroup({})
    }

    return (
        <div className="multi-sum-group">
            <ChooseSumGroup
            display={displayChoose}
            groups={groups}
            selectGroup={selectGroup} />

            {!isObjEmpty(chosenGroup) &&
                <SummaryGroupItem
                stepId={stepId}
                group={chosenGroup}
                sumId={sumId}
                display={!displayChoose}
                openChoose={openChoose} />  
            }
            
        </div>
    )
}

export default MultiSumGroups
