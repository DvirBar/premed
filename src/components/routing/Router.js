import React from 'react';
import { Route, Switch } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import AdminRoute from './AdminRoute';
import Default from '../Default';
import Register from '../auth/Register';
import Login from '../auth/Login';
import Profile from '../profile/Profile';
import AdminDefault from '../admin/AdminDefault';

const Router = () => {
    return ( 
        <div className="router">
            <Switch>
                <Route exact path="/" component={Default} />
                <Route exact path="/register" component={Register} />
                <Route exact path="/login" component={Login} />
                <ProtectedRoute exact path="/profile" component={Profile} />
                <AdminRoute exact path="/admin" component={AdminDefault} />
            </Switch>
        </div>
    )
}

export default Router;