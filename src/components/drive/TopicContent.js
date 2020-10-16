import React, { Fragment } from 'react';
import {
    BrowserRouter as Router,
    useLocation,
    Switch,
    Redirect,
    useRouteMatch
} from 'react-router-dom';
import TopicDetails from './TopicDetails';
import ProtectedRoute from '../routing/ProtectedRoute';
import PagesNav from './PagesNav';
import TopicRouter from './TopicRouter';

function TopicContent() {
    let { params, url } = useRouteMatch()
    let location = useLocation()
    const { topicUrl } = params
    url = url.slice(0, url.length - (topicUrl.length + 1))

    return (
        <Fragment>
            <PagesNav />
            <TopicRouter />
        </Fragment>
    )
}

export default TopicContent
