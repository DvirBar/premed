import React, { useContext } from 'react'
import FormFragment from './FormFragment'
import { useSelector } from 'react-redux'
import RemoveVals from './RemoveVals'
import { GroupsContext } from './GroupsContext'

function GroupFields({ group, isStaged, removeStagedGroup, insertData }) {
    const {
        getGroupVals,
        isSimulated
    } = useContext(GroupsContext)

    const groupVals = useSelector(getGroupVals(group._id))
    let displayRemove = false

    if(group.cusGroupParent || groupVals.length !== 0 || isStaged)
        displayRemove = true

    return (
        <div className="group-fields">
            <div className="group-name">
                {group.name}
            </div>
            <div className={`group-fields__fields ${isSimulated ? 'simulated' : ''}`}>
                {group.fields?.map(field =>
                    <FormFragment
                    key={field._id}
                    field={field}
                    isCalc={false}
                    group={group}
                    insertData={insertData} />
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
        </div>
    )
}

export default GroupFields
