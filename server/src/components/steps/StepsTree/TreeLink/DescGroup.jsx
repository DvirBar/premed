import React from 'react'
import DescriptionItem from './DescriptionItem'

function DescGroup({ descGroup, groupsLength, index }) {
    const isLast = index === groupsLength - 1
    const descItems = descGroup.description

    return (
        <g>
            {descItems?.length > 0 &&
                descItems.map((descItem, index) =>
                    <DescriptionItem
                    key={descItem._id}
                    descItem={descItem}
                    index={index} />
                )
            }
            {groupsLength > 1 && isLast &&
                <text>או</text>
            }
        </g>
    )
}

export default DescGroup
