import React from 'react'
import { Link, useRouteMatch } from 'react-router-dom'

function LibCardItem({ lib }) {
    const { url } = useRouteMatch()
    const notItem = lib.items.length === 0

    return (
        <Link 
        to={`${url}/${lib._id}`}
        className={`lib-item 
        ${notItem ? 'no-items' : ''}`}>
            <span className="lib-name">
                {lib.name}
            </span>
        </Link>
    )
}

export default LibCardItem
