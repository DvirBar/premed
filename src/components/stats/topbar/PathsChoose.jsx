import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, useRouteMatch } from 'react-router-dom'
import { getAllPaths } from '../../../redux/selectors/paths'
import TopLinks from '../../layout/TopLinks'

function PathsChoose({ tableId }) {
    const paths = useSelector(getAllPaths)
    let { path } = useRouteMatch()

    const linksList = paths.map(pathItem => ({
        name: pathItem.name,
        url: `${path}/${pathItem._id}/${tableId}`
    }))

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
                className="profile-link" 
                key={link.url} 
                to={link.url} 
                id={link.url}>
                    {link.name}
                </Link>
                )}
        </TopLinks>
    )
}

export default PathsChoose
