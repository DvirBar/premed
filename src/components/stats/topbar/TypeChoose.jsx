import React, { useState } from 'react'
import TopLinks from '../../layout/TopLinks'

function TypeChoose() {
    const linksList = [
        {
            name: 'טבלה',
            loc: 'table'
        },
        {
            name: 'סיפים',
            loc: 'thresh'
        }
    ]

    const [selectedLink, setSelectedLink] = useState(linksList[0].loc)
    
    const selectLink = loc => {
        setSelectedLink(loc)
    }

    return (
        <TopLinks 
        className="top-links-profile-nav"
        selectLink={selectLink}
        selected={selectedLink}>
            {linksList.map(link => 
                <span
                key={link.loc}
                id={link.loc}>
                    {link.name}
                </span>)}
        </TopLinks>
    )
}

export default TypeChoose
