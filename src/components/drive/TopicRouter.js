import React from 'react';
import {
    BrowserRouter as Router,
    useLocation,
    Switch,
    Redirect,
    useRouteMatch
} from 'react-router-dom';
import TopicDetails from './TopicDetails';
import ProtectedRoute from '../routing/ProtectedRoute';

function TopicRouter() {
    let { params, url } = useRouteMatch()
    let location = useLocation()
    const { topicUrl } = params
    url = url.slice(0, url.length - (topicUrl.length + 1))

    return (
        <Router>
            <Switch>
                <ProtectedRoute 
                path={`${url}/:topicUrl`} 
                component={TopicDetails} />
                <ProtectedRoute path=''>
                    <Redirect to={`${location.pathname}/${topicUrl}`} />
                </ProtectedRoute>
            </Switch>            
        </Router>
    )
}

export default TopicRouter
