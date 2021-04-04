import React from 'react';
import Announcements from './announcements/Announcements';

function Default() {
    return (
        <div className="default-page">
            <Announcements />
            {/* {auth.isAuthenticated && 
                <Dashboard />} */}
        </div>
    )
}

export default Default
