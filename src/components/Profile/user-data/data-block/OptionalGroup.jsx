import React, { Fragment, useEffect } from 'react'
import GroupsList from './GroupsList'

function OptionalGroup({ group, groups, getChildren }) {
    return (
        <Fragment>
            <GroupsList
            group={group}
            groups={groups}
            getChildren={getChildren} />
        </Fragment>
    )
}

export default OptionalGroup
