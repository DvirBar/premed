import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getStepById } from '../../../redux/selectors/steps';
import { isLoading } from '../../../redux/loader/selectors';
import Loadbar from '../../layout/Loadbar';
import { LOADING } from '../../../redux/loader/types';
import StepItemContent from './StepItemContent';

function StepItem() {
    const { stepId } = useParams()
    const loading = useSelector(isLoading(LOADING))

    const step = useSelector(getStepById(stepId))
    if(loading) return <Loadbar />

    if(!step) return <Fragment></Fragment>
    return (
        <StepItemContent step={step} />
    )
}

export default StepItem
