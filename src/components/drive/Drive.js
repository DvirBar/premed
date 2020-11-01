import React, { useEffect, useState } from 'react';
import { useRouteMatch, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getTopics } from '../../redux/actions/topics';
import TopLinks from '../layout/TopLinks';
import DriveRouter from './DriveRouter';

function Drive() {
    let { path } = useRouteMatch();

    const paths = useSelector(state => state.paths.paths)

    const linksList = (paths.map(pathItem => ({
        name: pathItem.name,
        url: `${path}/${pathItem._id}`
    })))

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getTopics());
    }, [])

    const [selectedLink, setSelectedLink] = useState(linksList[0].url)
    
    const selectLink = url => {
        setSelectedLink(url)
    }


    return (
        <div className="drive-main">
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
            <div className="drive-container">
                <DriveRouter />
            </div>
        </div>
    )
}

export default Drive
