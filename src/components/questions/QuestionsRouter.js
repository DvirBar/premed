import React from 'react';
import { 
    Route,
    Switch, 
    useRouteMatch } from 'react-router-dom';
import QuestionGroupsList from './QuestionGroupsList';
import QuestionsList from './QuestionsList';


const QuestionsRouter = () => {
    let { path } = useRouteMatch();
   
    return ( 
        <Switch>
            <Route exact path={`${path}`} component={QuestionGroupsList} />
            <Route exact path={`${path}/:groupId`} component={QuestionsList} />
        </Switch>
    )
}

export default QuestionsRouter;