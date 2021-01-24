import React, { Fragment } from 'react'
import { useSelector } from 'react-redux'
import { getFieldById } from '../../../../redux/selectors/statsinputs'
import DescGroup from './DescGroup'

function LinkInfo({ linkInfo }) {
    const field = useSelector(getFieldById(linkInfo.field))
    const descGroups = linkInfo.descriptionGroups

    return (
        <g>
            {linkInfo.name &&
                <text>{linkInfo.name}</text>
            }
            {field &&
                <text>{field.name}</text>
            }
            {descGroups?.length > 0 &&
                <g transform='translateX(0)'>
                    {descGroups.map((descGroup, index) =>
                        <DescGroup
                        key={descGroup._id}
                        descGroup={descGroup}
                        groupsLength={descGroups.length}
                        index={index} />
                    )}
                </g>
                
            }
        </g>
    )
}

export default LinkInfo
