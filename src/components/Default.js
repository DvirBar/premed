import React from 'react';
import { useSelector } from 'react-redux';
import Anouncements from './anouncements/Anouncements';
import Dashboard from './dashboard/Dashboard';
import LogToDashboard from './dashboard/LogToDashboard';

function Default() {
    const auth = useSelector(state => state.auth);

    return (
        <div className="default-page">
            <Anouncements />
            {auth.isAuthenticated && 
                <Dashboard />}
        </div>
    )
}

export default Default
