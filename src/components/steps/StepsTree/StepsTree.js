import React, { useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TreeContent from './TreeContent';
import { getStartingStep } from '../../../redux/selectors/steps';
import { getSteps } from '../../../redux/actions/steps';
import { StepsContext } from '../StepsContext';
import { isLoading } from '../../../redux/loader/selectors';
import { STEP } from '../../../redux/actions/types';
import Loadbar from '../../layout/Loadbar';

function StepsTree() {
    const firstStep = useSelector(getStartingStep)

    const {
        pathId 
    } = useContext(StepsContext)

    const dispatch = useDispatch()
    
    useEffect(() => {
        if(pathId) {
            dispatch(getSteps(pathId))
        }
    }, [pathId])

    const loading = useSelector(isLoading(STEP))

    if(loading) return <Loadbar />

    if(!firstStep) {
        return (
            <div className="no-resource-error">
                עדיין אין שלבים במסלול זה
            </div>
        )
    }

    return (
        <TreeContent 
        firstStep={firstStep} />
    )
}


export default StepsTree
