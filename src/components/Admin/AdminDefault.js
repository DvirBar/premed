import React from 'react'
import SideMenu from './SideMenu';
import Container from '../layout/Container';
import AdminRouter from './AdminRouter';

function AdminDefault() {
    return (
        <div className="admin-panel">
            <SideMenu />
            <Container>
                <AdminRouter />
            </Container>
        </div>
    )
}

export default AdminDefault;
