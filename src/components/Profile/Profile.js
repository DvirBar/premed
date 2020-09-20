import React from 'react'
import TopLinks from './TopLinks'
import ProfileRouter from './ProfileRouter';

function Profile() {
    return (
        <div className="user-profile">
            <TopLinks />
            <div className="profile-container">
                <ProfileRouter />
            </div>
        </div>
    )
}

export default Profile
