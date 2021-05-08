import React from 'react';
import { useSelector } from 'react-redux';
import TreeContent from './TreeContent';
import { getStartingStep } from '../../../redux/selectors/steps';
import { isLoading } from '../../../redux/loader/selectors';
import { STEP } from '../../../redux/actions/types';
import Loadbar from '../../layout/Loadbar';

function StepsTree() {
    const firstStep = useSelector(getStartingStep)

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
