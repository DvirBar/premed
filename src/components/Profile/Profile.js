import React, { useState } from 'react'
import { useRouteMatch, Link, useLocation } from 'react-router-dom';
import ContentContainer from '../layout/Containers/ContentContainer/ContentContainer';
import TopLinks from '../layout/TopLinks';
import TopLinksWrapper from '../layout/TopLinksWrapper';
import { splitUrl } from '../routing/utils';
import ProfileRouter from './ProfileRouter';

function Profile() {
    let { path } = useRouteMatch();
    const { pathname } = useLocation()

    const linksList = [
        {
            url: `${path}`,
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

    return (
        <div>
            <TopLinksWrapper>
                <TopLinks 
                className="top-links-profile-nav"
                selected={pathname}>
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
            </TopLinksWrapper>
 
            <ContentContainer>
                <div className="profile-container">
                    <ProfileRouter />
                </div>
            </ContentContainer>
                
           
        </div>
    )
}

export default Profile
