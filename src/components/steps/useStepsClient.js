import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useHistory, useRouteMatch } from 'react-router-dom'
import { getPathById } from '../../redux/selectors/paths';
import useStepsGlobal from './useStepsGlobal';

function useStepsClient() {

    // Get path data from url 
    const history = useHistory()
    let { params, path } = useRouteMatch();
    const { pathId } = params
    let newPath = path.replace(/:pathId/g, pathId)

    const selectStep = (step, event) => {
        if(event)
            event.stopPropagation()

        history.push(`${newPath}/${step._id}`)
    }

    const stepsGlobal = useStepsGlobal(pathId)
    
    return {
        pathId,
        selectStep,
        isStepsAdmin: false,
        ...stepsGlobal
    }
}

export default useStepsClient
