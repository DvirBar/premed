import React from 'react'
import { useSelector } from 'react-redux'
import { Link, useHistory, useRouteMatch } from 'react-router-dom'
import { getLibById } from '../../../../redux/libraries/selectors'


function LibraryMenuItem({ libItem }) {
    const { url } = useRouteMatch()
    
    const lib = useSelector(getLibById(libItem.libId))

    return (
        <Link to={`${url}${libItem.url}`}>
            {lib?.name}         
        </Link>
    )
}

export default LibraryMenuItem
