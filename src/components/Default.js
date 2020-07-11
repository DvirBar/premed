import React from 'react';
import { useSelector } from 'react-redux';
import Anouncements from './anouncements/Anouncements';
import Dashboard from './dashboard/Dashboard';
import LogToDashboard from './dashboard/LogToDashboard';

function Default() {
    const auth = useSelector(state => state.auth);

    return (
        <div>
            <Anouncements />

            {auth.isAuthenticated 
            ? <Dashboard />
            : <LogToDashboard />}
        </div>
    )
}

export default Default
