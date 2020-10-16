import React, { Fragment } from 'react';
import { useRouteMatch } from 'react-router-dom';
import ProtectedRoute from '../routing/ProtectedRoute';
import Page from './Page';
import PagesMenu from './PagesMenu';
import TopicContent from './TopicContent';


const DriveRouter = () => {
    let { path } = useRouteMatch();

    return ( 
        <Fragment>
            <ProtectedRoute exact path={`${path}/:pathId`} component={PagesMenu} />
            <ProtectedRoute exact path={`${path}/:pathId/:pageUrl`} component={Page} />
            <ProtectedRoute path={`${path}/:pathId/:pageUrl/:topicUrl`} component={TopicContent} />
        </Fragment>
    )
}

export default DriveRouter;