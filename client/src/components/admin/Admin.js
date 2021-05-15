import React from 'react'
import SideMenu from './SideMenu';
import AdminRouter from './AdminRouter';
import ContentContainer from '../layout/Containers/ContentContainer/ContentContainer';

function Admin() {
    return (
        <div className="admin-panel">
            <ContentContainer>
                <SideMenu />
                <AdminRouter />
            </ContentContainer>
        </div>
    )
}

export default Admin;
