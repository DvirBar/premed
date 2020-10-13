import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { 
    Switch, 
    useLocation,
    useRouteMatch } from 'react-router-dom';
import { initMessage } from '../../redux/actions/messages';
import ProtectedRoute from '../routing/ProtectedRoute';
import PathStats from './PathStats';


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
            <ProtectedRoute exact path={`${path}/:pathId`} component={PathStats} />
        </Switch>
    )
}

export default StatsRouter;