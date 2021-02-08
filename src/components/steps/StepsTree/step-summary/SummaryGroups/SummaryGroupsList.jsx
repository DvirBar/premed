import React, { Fragment, useContext, useRef, useState } from 'react'
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
                    isSingle={true}
                    display={display || isStepsAdmin} />
                }
                </Fragment>
            }
        </div>
    )
}

export default SummaryGroupsList
