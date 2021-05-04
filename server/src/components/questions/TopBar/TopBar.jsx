import React from 'react'
import TopLinksWrapper from '../../layout/TopLinksWrapper'
import TopLinks from '../../layout/TopLinks';
import { generatePath, useRouteMatch } from 'react-router';
import { useSelector } from 'react-redux';
import { getAllPaths } from '../../../redux/selectors/paths';
import { Link } from 'react-router-dom';

function TopBar() {
    let { path, params } = useRouteMatch();
    const { pathId } = params;
    const paths = useSelector(getAllPaths)

    const linksList = paths.map(pathItem => ({
        name: pathItem.name,
        url: generatePath(path, { pathId: pathItem._id }),
        id: pathItem._id
    }))

    return (
        <TopLinksWrapper>
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
        </TopLinksWrapper>
    )
}

export default TopBar
