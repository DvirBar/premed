import React from 'react'
import { Link, useRouteMatch } from 'react-router-dom'

function LibCardItem({ lib, noItems }) {
    const { url } = useRouteMatch()

    return (
        <Link 
        to={`${url}/${lib._id}`}
        className={`lib-card-item 
        ${noItems ? 'no-items' : ''}`}>
            <span className="lib-name">
                {lib.name}
            </span>
        </Link>
    )
}

export default LibCardItem
