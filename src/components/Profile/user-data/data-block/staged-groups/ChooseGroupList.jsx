import React, { useEffect, useState } from 'react'
import useSearch from '../../../../common/hooks/useSearch'

function ChooseGroupList({ groups, chooseGroup, keyword }) {
    const filteredGroups = useSearch(
        groups, 
        keyword, 
        groups.find(group => group.multiVals)?._id)


    return (
        <div className="choose-group-list">
            {filteredGroups.map(group => 
                <div
                className="choose-group-item"
                key={group._id}
                onClick={() => chooseGroup(group)}>
                    {group.name}
                </div>)}
        </div>
    )
}

export default React.memo(ChooseGroupList)
