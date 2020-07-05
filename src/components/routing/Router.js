import React from 'react';
import { Route, Switch } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import AdminRoute from './AdminRoute';
import Default from '../Default';
import Profile from '../profile/Profile';
import AdminDefault from '../admin/AdminDefault';

const Router = () => {
    return ( 
        <div className="router">
            <Switch>
                <Route exact path="/" component={Default} />
                <ProtectedRoute exact path="/profile" component={Profile} />
                <AdminRoute exact path="/admin" component={AdminDefault} />
            </Switch>
        </div>
    )
}

export default Router;