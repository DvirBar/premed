import React from 'react'
import FormFragment from './FormFragment'
import { useSelector } from 'react-redux'
import { getGroupVals } from '../../../../redux/selectors/userdata'
import RemoveVals from './RemoveVals'

function GroupFields({ group, isStaged, removeStagedGroup }) {
    const groupVals = useSelector(getGroupVals(group._id))
    let displayRemove = false

    if(group.cusGroupParent || groupVals.length !== 0 || isStaged)
        displayRemove = true

    return (
        <div className="group-fields">
            <div className="group-name">
                {group.name}
            </div>
            {group.fields?.map(field =>
                <FormFragment
                key={field._id}
                field={field}
                isCalc={false}
                group={group} />
            )}

            {displayRemove &&
                <RemoveVals 
                groupId={group._id}
                cusGroupParent={group.cusGroupParent}
                removeAll={true}
                removeStagedGroup={removeStagedGroup}
                isStaged={isStaged} />
            }
        </div>
    )
}

export default GroupFields
