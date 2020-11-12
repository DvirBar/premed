import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { 
    Switch, 
    useLocation,
    useParams,
    useRouteMatch } from 'react-router-dom';
import { initMessage } from '../../redux/actions/messages';
import ProtectedRoute from '../routing/ProtectedRoute';
import PathStats from './PathStats';
import StatsContent from './StatsContent';

const StatsRouter = () => {
    const dispatch = useDispatch();
    let location = useLocation();
    let { path } = useRouteMatch();

    // Initialize messages when switching url
    useEffect(() => {
        dispatch(initMessage());
    }, [location])

    return ( 
        <Switch>
            <ProtectedRoute exact 
            path={`${path}/:pathId/:tableId/:type`} 
            component={StatsContent} />
        </Switch>
    )
}

export default StatsRouter;