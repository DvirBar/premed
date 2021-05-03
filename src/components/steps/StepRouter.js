import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { 
    Route,
    Switch, 
    useLocation,
    useRouteMatch } from 'react-router-dom';
import { initMessage } from '../../redux/actions/messages';
import { getSteps } from '../../redux/actions/steps';
import StepItem from './step-details/StepItem';
import PathSteps from './‎PathSteps';


const StepRouter = () => {
    const dispatch = useDispatch();
    let location = useLocation();
    let { path, params } = useRouteMatch();

    const { pathId } = params

    useEffect(() => {
        if(pathId) {
            dispatch(getSteps(pathId))
        }
    }, [pathId])

    // Initialize messages when switching url
    useEffect(() => {
        dispatch(initMessage());
    }, [location])

  
    return ( 
        <Switch>
            <Route exact path={`${path}`} component={PathSteps} />
            <Route exact path={`${path}/:stepId`} component={StepItem} />
        </Switch>
    )
}

export default StepRouter;