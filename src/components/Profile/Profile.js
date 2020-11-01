import React, { useState } from 'react'
import { useRouteMatch, Link } from 'react-router-dom';
import TopLinks from '../layout/TopLinks';
import ProfileRouter from './ProfileRouter';

function Profile() {
    let { path } = useRouteMatch();

    const linksList = [
        {
            url: path,
            name: 'פרטים והגדרות'
        },
        {
            url: `${path}/userdata`,
            name: 'נתונים'
        },
        {
            url: `${path}/suggestions`,
            name: 'הפניות שלי'
        }
    ]

    const [selectedLink, setSelectedLink] = useState(linksList[0].url)

    const selectLink = url => {
        setSelectedLink(url)
    }

    console.log(selectedLink);

    return (
        <div className="user-profile">
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
            <div className="profile-container">
                <ProfileRouter />
            </div>
        </div>
    )
}

export default Profile
