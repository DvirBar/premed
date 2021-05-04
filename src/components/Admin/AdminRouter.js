import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { 
    Switch, 
    useLocation,
    useRouteMatch } from 'react-router-dom';
import { initMessage } from '../../redux/actions/messages';
import AdminRoute from '../routing/AdminRoute';
import AdminDefault from './default/AdminDefault';
import AncAdmin from './announcements/AncAdmin';
import StepsAdmin from './steps/StepsAdmin';
import Questions from './questions/Questions';
import DataTables from './stats/DataTables';
import LibrariesAdmin from './libraries/LibrariesAdmin';


const AdminRouter = () => {
    const dispatch = useDispatch();
    let location = useLocation();
    let { path } = useRouteMatch();

    // Initialize messages when switching url
    useEffect(() => {
        dispatch(initMessage());
    }, [location])

    return ( 
            <Switch>
                <AdminRoute exact path={`${path}`} component={AdminDefault} />
                <AdminRoute path={`${path}/announcements`} component={AncAdmin} />
                <AdminRoute path={`${path}/steps`} component={StepsAdmin} />
                <AdminRoute path={`${path}/libraries/:pathId`} component={LibrariesAdmin} />
                <AdminRoute path={`${path}/questions/:pathId`} component={Questions} />
                <AdminRoute exact path={`${path}/stats`} component={DataTables} />                
            </Switch>
    )
}

export default AdminRouter;