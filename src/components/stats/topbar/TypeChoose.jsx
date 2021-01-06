import React, { useState } from 'react'
import { Link, useRouteMatch } from 'react-router-dom'
import TopLinks from '../../layout/TopLinks'

function TypeChoose({ pathId, tableId, type, newPath }) {
    const linksList = [
        {
            name: 'טבלה',
            url: newPath(pathId, tableId, 'table'),
            id: 'table'
        },
        {
            name: 'סיפים',
            url: newPath(pathId, tableId, 'thresholds'),
            id: 'thresholds'
        }
    ]
 

    return (
        <TopLinks 
        className="top-links-profile-nav"
        selected={type}>
            {linksList.map(link => 
                <Link
                key={link.id}
                id={link.id}
                to={link.url}>
                    {link.name}
                </Link>)}
        </TopLinks>
    )
}

export default TypeChoose
