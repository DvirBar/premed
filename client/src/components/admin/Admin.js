import React from 'react'
import SideMenu from './SideMenu';
import AdminRouter from './AdminRouter';

function Admin() {
    return (
        <div className="admin-panel">
            <div className="admin-content">
                <AdminRouter />
            </div>
        </div>
    )
}

export default Admin;
