import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Switch, useLocation } from 'react-router-dom';
import { initMessage } from '../../redux/actions/messages';
import ProtectedRoute from './ProtectedRoute';
import AdminRoute from './AdminRoute';
import Default from '../Default';
import Register from '../auth/Register';
import Login from '../auth/Login';
import Profile from '../profile/Profile';
import Admin from '../admin/Admin';
import Steps from '../steps/Steps';
import StepItem from '../steps/StepItem';
import Subpage from '../topics/Subpage';
import TopicContent from '../topics/TopicContent';
import NoMatchPage from '../layout/NoMatchPage';

const Router = () => {
    const location = useLocation();
    const dispatch = useDispatch();
    const paths = useSelector(state => state.paths);

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
                <AdminRoute path="/admin" component={Admin} />
                <Route exact path="/steps/:pathId" component={Steps} />
                <ProtectedRoute exact path="/steps/:pathId/:stepId" component={StepItem} />
                <ProtectedRoute exact path="/:pageUrl/:subpageUrl" component={Subpage} />
                <ProtectedRoute path="/:pageUrl/:subpageUrl/:topicUrl" component={TopicContent} />
                <Route component={NoMatchPage} />
            </Switch>
        </div>
    )
}

export default Router;