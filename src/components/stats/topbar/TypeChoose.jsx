import React, { useState } from 'react'
import { Link, useRouteMatch } from 'react-router-dom'
import TopLinks from '../../layout/TopLinks'

function TypeChoose({ pathId, tableId }) {
    let { path } = useRouteMatch()

    const linksList = [
        {
            name: 'טבלה',
            url: `${path}/${pathId}/${tableId}/table`
        },
        {
            name: 'סיפים',
            url: `${path}/${pathId}/${tableId}/thresholds`
        }
    ]

    const [selectedLink, setSelectedLink] = useState(linksList[0].url)
    
    const selectLink = url => {
        setSelectedLink(url)
    }

    return (
        <TopLinks 
        className="top-links-profile-nav"
        selectLink={selectLink}
        selected={selectedLink}>
            {linksList.map(link => 
                <Link
                key={link.url}
                id={link.url}
                to={link.url}>
                    {link.name}
                </Link>)}
        </TopLinks>
    )
}

export default TypeChoose
