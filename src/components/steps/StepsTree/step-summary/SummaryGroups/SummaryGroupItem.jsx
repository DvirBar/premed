import React, { Fragment, useContext, useState } from 'react'
import LabelButton from '../../../../common/buttons/LabelButton'
import { StepsContext } from '../../../StepsContext'
import AddContent from './AddContent'
import ContentItem from './ContentItem'

function SummaryGroupItem({ 
    group, 
    stepId, 
    sumId, 
    openChoose,
    display }) {
    const [displayAdd, setDisplayAdd] = useState(false)

    const {
        isStepsAdmin
    } = useContext(StepsContext)

    const toggleDisplayAdd = toggle => {
        if(isStepsAdmin) {
            setDisplayAdd(toggle)
        }

        else {
            setDisplayAdd(false)
        }
    }

    return (
        <div 
        className={`summary-group-item
        ${display ? 'display' : '' }`}>
            {openChoose &&
                <div>
                    <i 
                    onClick={() => openChoose()}
                    className="material-icons return-choose">
                        navigate_next
                    </i>
                </div>
            }

            {isStepsAdmin &&
                <div className="sum-group-name">
                    {group.name}
                </div>
            }
            <div className="sum-content-list">
                {group.contents?.map(content =>
                    <ContentItem
                    key={content._id}
                    stepId={stepId}
                    sumId={sumId}
                    groupId={group._id}
                    content={content} />
                )}

                {isStepsAdmin &&
                    <div className="add-content-block">
                    {displayAdd
                    ?   <AddContent
                        stepId={stepId}
                        groupId={group._id}
                        sumId={sumId}
                        toggleDisplay={toggleDisplayAdd} />
                    
                    :   <LabelButton
                        label="הוספת רכיב"
                        icon="add"
                        onClick={() => setDisplayAdd(true)} />
                    }
                    </div>
                }
            </div>
        </div>
    )
}

export default SummaryGroupItem
