import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Switch, useLocation } from 'react-router-dom';
import { initMessage } from '../../redux/actions/messages';
import ProtectedRoute from './ProtectedRoute';
import AdminRoute from './AdminRoute';
import Default from '../Default/Default';
import Register from '../auth/Register/Register';
import Login from '../auth/Login/Login';
import Steps from '../steps/Steps';
import NoMatchPage from '../layout/NoMatchPage/NoMatchPage';
import Stats from '../stats/Stats';
import Questions from '../questions//Questions';
import LibrariesClient from '../libraries/LibrariesClient';
import ViewAncs from '../announcements/ViewAncs/ViewAncs';
import Admin from '../admin/Admin';
import Profile from '../Profile/Profile';
import ResetPassword from '../auth/ResetPassword/ResetPassword';

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
                <Route exact path="/resetPassword/:token" component={ResetPassword} />
                <Route path="/steps/:pathId" component={Steps} />
                <Route path="/qna/:pathId" component={Questions} />
                <ProtectedRoute path="/profile" component={Profile} />
                <ProtectedRoute path="/announcements" component={ViewAncs} />
                <ProtectedRoute path="/stats" component={Stats} />
                <ProtectedRoute path="/library/:pathId" component={LibrariesClient} />
                <AdminRoute path="/admin" component={Admin} />
                <Route component={NoMatchPage} />  
            </Switch>
        </div>
    )
}

export default Router;