import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { 
    Switch, 
    useLocation,
    useRouteMatch } from 'react-router-dom';
import { initMessage } from '../../redux/actions/messages';
import ProtectedRoute from '../routing/ProtectedRoute';
import UserDetails from './UserDetails';

const ProfileRouter = () => {
    const dispatch = useDispatch();
    let location = useLocation();
    let { path } = useRouteMatch();

    // Initialize messages when switching url
    useEffect(() => {
        dispatch(initMessage());
    }, [location])

    return ( 
        <Switch>
            <ProtectedRoute exact path={`${path}`} component={UserDetails} />
            <ProtectedRoute exact path={`${path}/userdata`} component={UserDetails} />
            <ProtectedRoute exact path={`${path}/suggestions`} component={UserDetails} />
        </Switch>
    )
}

export default ProfileRouter;