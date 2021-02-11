import React from 'react'
import { useSelector } from 'react-redux'
import { generatePath, Link, useLocation, useRouteMatch } from 'react-router-dom';
import { getAllPaths } from '../../redux/selectors/paths'
import TopLinks from '../layout/TopLinks';

function TopBar() {
    let { path, params } = useRouteMatch();
    const { pathId } = params

    const paths = useSelector(getAllPaths)

    const createPath = pathId => {
        return generatePath(path, { pathId })
    }
    
    const linksList = paths.map(pathItem => ({
        name: pathItem.name,
        url: createPath(pathItem._id),
        id: pathItem._id
    }))


    return (
        <div className="top-content-nav">
            <TopLinks 
            className="top-links-profile-nav"
            selected={pathId}>
                {linksList.map(link => 
                    <Link
                    className="profile-link" 
                    key={link.id} 
                    to={link.url} 
                    id={link.id}>
                        {link.name}
                    </Link>
                    )}
            </TopLinks>
        </div> 
    )
}

export default TopBar
