import { generatePath, useHistory, useLocation, useRouteMatch } from 'react-router-dom'
import useStepsGlobal from './useStepsGlobal';

function useStepsClient() {
    // Get path data from url 
    const history = useHistory()
    let { params, path } = useRouteMatch();
    const { pathname } = useLocation()
    const { pathId, stepId } = params
    
    const selectStep = (event, step) => {
        if(event)
            event.stopPropagation()

        let url
        const newStep = step._id
        if(stepId) {
            url = generatePath(path, { 
                pathId,  
                stepId: newStep 
            })
        }

        else {
            url = `${pathname}/${newStep}`
        }

        history.push(url)
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
