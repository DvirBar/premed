import React from 'react'
import GroupsList from './GroupsList'

function OptionalGroup({ group, groups, getChildren }) {
    return (
        <GroupsList
        group={group}
        groups={groups}
        getChildren={getChildren} />
    )
}

export default OptionalGroup
