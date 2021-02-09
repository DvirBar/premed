import { useHistory, useRouteMatch } from 'react-router-dom'
import useStepsGlobal from './useStepsGlobal';

function useStepsClient() {
    // Get path data from url 
    const history = useHistory()
    let { params, path } = useRouteMatch();
    const { pathId } = params
    let newPath = path.replace(/:pathId/g, pathId)

    const selectStep = (event, step, isFinal) => {
        if(event)
            event.stopPropagation()

        if(!isFinal) {
            history.push(`${newPath}/${step._id}`)
        }
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
