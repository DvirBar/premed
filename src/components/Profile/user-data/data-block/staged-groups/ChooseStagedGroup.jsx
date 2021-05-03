import React, { useRef, useState } from 'react'
import useOnClickOutside from '../../../../common/useOnClickOutside'
import AddCustomGroup from './AddCustomGroup'
import ChooseGroupList from './ChooseGroupList'
import SearchGroups from './SearchGroups'

function ChooseStagedGroup({ 
    groups, 
    chooseGroup, 
    changeDisplay,
    display,
    displayCustom,
    selMultiGroup }) {
    const ref = useRef()
    useOnClickOutside(ref, display, () => changeDisplay(false))

    const [keyword, setKeyword] = useState('')

    const changeKeyword = word => {
        setKeyword(word)
    }

    // Overflow
    if(display) {
        document.documentElement.style.overflowY = 'hidden';
        document.body.scroll = "no"
    }

    else {
        document.documentElement.style.overflowY = 'auto';
        document.body.scroll = "yes"
    }

    return (
        <div 
        className={`choose-staged-group
        ${display ? 'display' : ''}`}>
            <div
            className="choose-staged-container"
            ref={ref}>
                <SearchGroups
                keyword={keyword}
                onChange={changeKeyword} />

                <ChooseGroupList
                groups={groups}
                chooseGroup={chooseGroup}
                keyword={keyword} />

                <AddCustomGroup
                changeDisplay={changeDisplay}
                displayCustom={displayCustom}
                selMultiGroup={selMultiGroup} />                 
        
                <i   
                onClick={() => changeDisplay(false)}
                className='material-icons cancel-staged'>
                    close
                </i>               
            </div> 
        </div> 
    )
}

export default React.memo(ChooseStagedGroup)
