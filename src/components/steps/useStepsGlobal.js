import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { stepsFilterUnis } from '../../redux/actions/steps';
import { getStepsByUnis } from '../../redux/selectors/steps'
import { getUnisByPath } from '../../redux/selectors/unis';
import { addOrRemove } from '../../utils/arrays'

function useStepsGlobal(pathId) {
    const unis = useSelector(getUnisByPath(pathId))
    const [hasInit, setHasInit] = useState(false)
    const [selUnis, setSelUnis] = useState([])
    const selectUni = uniObj => {
        setSelUnis(addOrRemove(selUnis, uniObj.value))
    }

    const dispatch = useDispatch()
    
    useEffect(() => {
        if(unis.length > 0 && !hasInit) {
            setHasInit(true)
            setSelUnis(unis.map(uni => uni._id))
        }
    }, [unis])

    const steps = useSelector(getStepsByUnis(selUnis))


    useEffect(() => {
        if(selUnis.length > 0) {
            dispatch(stepsFilterUnis(selUnis))
        }
    }, [selUnis])

    return {
        unis,
        selUnis,
        selectUni,
        steps
    }
}

export default useStepsGlobal
