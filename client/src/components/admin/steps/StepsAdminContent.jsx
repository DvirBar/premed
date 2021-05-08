import React, { useContext, useEffect } from 'react'
import { Fragment } from 'react'
import { useDispatch } from 'react-redux'
import { getSteps } from '../../../redux/actions/steps'
import { StepsContext } from '../../steps/StepsContext'
import StepsContent from './StepsContent/StepsContent'
import StepsEditSeciton from './StepsEditSection/StepsEditSeciton'

function StepsAdminContent() {

    const {
        pathId 
    } = useContext(StepsContext)

    const dispatch = useDispatch()

    useEffect(() => {
        if(pathId) {
            dispatch(getSteps(pathId))
        }
    }, [pathId])


    return (
        <Fragment>
            <StepsContent />
            <StepsEditSeciton />
        </Fragment>
    )
}

export default StepsAdminContent
