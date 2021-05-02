import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
    Route,
    Switch, 
    useLocation,
    useRouteMatch } from 'react-router-dom';
import { initMessage } from '../../redux/actions/messages';
import { getSteps } from '../../redux/actions/steps';
import { STEP } from '../../redux/actions/types';
import { isLoading } from '../../redux/loader/selectors';
import { getStartingStep } from '../../redux/selectors/steps';
import Loadbar from '../layout/Loadbar';
import StepItem from './step-details/StepItem';
import PathSteps from './‎PathSteps';


const StepRouter = () => {
    const dispatch = useDispatch();
    let location = useLocation();
    let { path, params } = useRouteMatch();

    const { pathId } = params

    useEffect(() => {
        console.log(pathId);
        if(pathId) {
            dispatch(getSteps(pathId))
        }
    }, [pathId])

    // Initialize messages when switching url
    useEffect(() => {
        dispatch(initMessage());
    }, [location])

    const loading = useSelector(isLoading(STEP))

    const firstStep = useSelector(getStartingStep)

    if(loading) {
        return <Loadbar />
    }

    if(!firstStep) {
        return (
            <div className="no-resource-error">
                עדיין אין שלבים במסלול זה
            </div>
        )
    }

    return ( 
        <Switch>
            <Route exact path={`${path}`} component={PathSteps} />
            <Route exact path={`${path}/:stepId`} component={StepItem} />
        </Switch>
    )
}

export default StepRouter;