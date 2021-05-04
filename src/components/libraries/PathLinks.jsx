import React from 'react'
import { useSelector } from 'react-redux';
import { generatePath, useRouteMatch } from 'react-router';
import { Link } from 'react-router-dom';
import { getAllPaths } from '../../redux/selectors/paths';
import TopLinks from '../layout/TopLinks';
import TopLinksWrapper from '../layout/TopLinksWrapper';

function PathLinks() {
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
        <TopLinksWrapper>
            <TopLinks 
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

export default PathLinks
