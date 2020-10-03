import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { 
    Switch, 
    useLocation,
    useRouteMatch } from 'react-router-dom';
import { initMessage } from '../../redux/actions/messages';
import AdminRoute from '../routing/AdminRoute';
import AdminDefault from './default/AdminDefault';
import AncAdmin from './anouncements/AncAdmin';
import StepsAdmin from './steps/StepsAdmin';
import Pages from './pages/Pages';
import Stats from './stats/Stats';
import StatsMain from './stats/StatsMain';


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
                <AdminRoute path={`${path}/anouncements`} component={AncAdmin} />
                <AdminRoute path={`${path}/steps`} component={StepsAdmin} />
                <AdminRoute path={`${path}/pages`} component={Pages} />
                <AdminRoute exact path={`${path}/stats`} component={StatsMain} />
            </Switch>
    )
}

export default AdminRouter;