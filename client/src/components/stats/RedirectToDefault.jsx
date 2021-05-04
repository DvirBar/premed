import React, { Fragment, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useHistory, useRouteMatch } from 'react-router'
import { getPriorityTable } from '../../redux/selectors/datatables'
import { getAllPaths } from '../../redux/selectors/paths'

function RedirectToDefault() {
    let history = useHistory()
    let { path } = useRouteMatch()
    const paths = useSelector(getAllPaths)
    const activeTable = useSelector(getPriorityTable)

    useEffect(() => {
        if(activeTable) {
            history.push(`${path}/${paths[0]._id}/${activeTable._id}/table`)
        }
    }, [activeTable])

    return (
        <Fragment></Fragment>
    )
}

export default RedirectToDefault
