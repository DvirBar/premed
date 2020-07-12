import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Switch, useLocation } from 'react-router-dom';
import { initMessage } from '../../redux/actions/messages';
import ProtectedRoute from './ProtectedRoute';
import AdminRoute from './AdminRoute';
import Default from '../Default';
import Register from '../auth/Register';
import Login from '../auth/Login';
import Profile from '../profile/Profile';
import AdminDefault from '../admin/AdminDefault';

const Router = () => {
    const location = useLocation();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(initMessage());
    }, [location])

    return ( 
        <div className="router">
            <Switch>
                <Route exact path="/" component={Default} />
                <Route exact path="/register" component={Register} />
                <Route exact path="/login" component={Login} />
                <ProtectedRoute exact path="/profile" component={Profile} />
                <AdminRoute path="/admin" component={AdminDefault} />
            </Switch>
        </div>
    )
}

export default Router;