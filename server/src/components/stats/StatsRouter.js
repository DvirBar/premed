import React from 'react';
import { 
    Switch, 
    useRouteMatch } from 'react-router-dom';
import ProtectedRoute from '../routing/ProtectedRoute';
import RedirectToDefault from './RedirectToDefault';
import StatsContent from './StatsContent';

const StatsRouter = () => {
    let { path } = useRouteMatch();

    return ( 
        <Switch>
            <ProtectedRoute exact 
            path={`${path}/:pathId/:tableId/:type`} 
            component={StatsContent} />
            <ProtectedRoute 
            component={RedirectToDefault} />
        </Switch>
    )
}

export default StatsRouter;