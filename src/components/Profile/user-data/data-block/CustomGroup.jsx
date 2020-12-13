import React, { Fragment } from 'react'
import GroupsList from './GroupsList'

function CustomGroup({ customGroup, groups }) {
    const fields = groups.find(groupItem => 
        groupItem._id === customGroup.cusGroupParent).fields

    const group = {
        ...customGroup,
        fields
    }

    return (
        <GroupsList
        group={group}
        groups={[]} />
    )
}

export default CustomGroup
