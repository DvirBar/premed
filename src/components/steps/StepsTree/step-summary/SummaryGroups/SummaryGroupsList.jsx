import React, { Fragment, useContext, useRef, useState } from 'react'
import AddSummaryGroup from './AddSummaryGroup'
import SummaryGroupItem from './SummaryGroupItem'
import { StepsContext } from '../../../StepsContext';
import MultiSumGroups from './MultiSumGroups';
import useOnClickOutside from '../../../../common/useOnClickOutside';

function SummaryGroupsList({ 
    stepId, 
    sumId, 
    groups, 
    display,
    toggleGroups }) {
    const {
        isStepsAdmin
    } = useContext(StepsContext)

    const ref = useRef()

    useOnClickOutside(ref, display, () => toggleGroups(false))
    console.log(groups);
    return (
        <div 
        ref={ref}
        className={`summary-groups-list
        ${!isStepsAdmin ? 'client' : ''}
        ${isStepsAdmin || display ? 'display': ''}`}>
            {groups.length > 0 && 
                <Fragment>
                {groups.length > 1
                ?   <MultiSumGroups
                    displayGroups={display}
                    stepId={stepId}
                    sumId={sumId}
                    groups={groups} />

                :   <SummaryGroupItem
                    stepId={stepId}
                    group={groups[0]}
                    sumId={sumId}
                    display={display || isStepsAdmin} />
                }
                </Fragment>
            }
            
            
            {isStepsAdmin &&
                <AddSummaryGroup
                stepId={stepId}
                sumId={sumId} />                
            }
        </div>
    )
}

export default SummaryGroupsList
