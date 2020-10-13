import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { 
    Route,
    Switch, 
    useLocation,
    useRouteMatch } from 'react-router-dom';
import { initMessage } from '../../redux/actions/messages';
import ProtectedRoute from '../routing/ProtectedRoute';
import QuestionGroupsList from './QuestionGroupsList';
import QuestionsList from './QuestionsList';


const QuestionsRouter = () => {
    const dispatch = useDispatch();
    let location = useLocation();
    let { path } = useRouteMatch();

    // Initialize messages when switching url
    useEffect(() => {
        dispatch(initMessage());
    }, [location])

    return ( 
        <Switch>
            <Route exact path={`${path}/general`} component={QuestionGroupsList} />
            <Route exact path={`${path}/:pathId`} component={QuestionGroupsList} />
            <Route exact path={`${path}/:pathId/:groupId`} component={QuestionsList} />
        </Switch>
    )
}

export default QuestionsRouter;