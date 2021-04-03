import React from 'react'
import { useSelector } from 'react-redux'
import { getGroups } from '../../../../../../redux/announcements/groups/selectors'
import { getAllPaths } from '../../../../../../redux/selectors/paths'
import PathGroups from './PathGroups'

function GroupsList() {
    const paths = useSelector(getAllPaths)

    return (
        <div className="groups-list">
            {paths.map(path => 
                <PathGroups
                key={path._id}
                path={path} />
            )}
        </div>
    )
}

export default GroupsList
