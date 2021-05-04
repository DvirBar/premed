import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getAllPaths } from '../../../redux/selectors/paths'
import TopLinks from '../../layout/TopLinks'

function PathsChoose({ pathId, tableId, type, newPath }) {
    const paths = useSelector(getAllPaths)

    const linksList = paths.map(pathItem => ({
        name: pathItem.name,
        url: newPath(pathItem._id, tableId, type),
        id: pathItem._id
    }))

    return (
        <TopLinks 
        className="top-links-profile-nav"
        selected={pathId}>
            {linksList.map(link => 
                <Link
                className="profile-link" 
                key={link.url} 
                to={link.url} 
                id={link.id}>
                    {link.name}
                </Link>
                )}
        </TopLinks>
    )
}

export default PathsChoose
