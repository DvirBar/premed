import React, { useState } from 'react';
import { useRouteMatch, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import TopLinks from '../layout/TopLinks';
import StepRouter from './StepRouter';

function Steps() {
    let { path } = useRouteMatch();

    const paths = useSelector(state => state.paths.paths)

    const linksList = paths.map(pathItem => ({
        name: pathItem.name,
        url: `${path}/${pathItem._id}`
    }))

    const [selectedLink, setSelectedLink] = useState(linksList[0].url)
    
    const selectLink = url => {
        setSelectedLink(url)
    }

    return (
        <div>
            <div className="top-content-nav">
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
            </div> 

            <StepRouter />
        </div>
    )
}

export default Steps