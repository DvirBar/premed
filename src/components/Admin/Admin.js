import React, { useEffect } from 'react'
import SideMenu from './SideMenu';
import AdminRouter from './AdminRouter';
import { useDispatch } from 'react-redux';
import { getUnis } from '../../redux/actions/universities';

function Admin() {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getUnis());
    }, [])

    return (
        <div className="admin-panel">
            <SideMenu />
            <div className="admin-content">
                <AdminRouter />
            </div>
        </div>
    )
}

export default Admin;
