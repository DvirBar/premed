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

    const getTreeColor = uniData => {
        const baseColor = '#486974'

        if(selUnis.length === 1) {
            const color = unis?.find(uni => 
                selUnis[0] === uni._id)?.color

            return color || baseColor
        }

        if(uniData.length > 1) {
            return baseColor
        }

        const color = unis?.find(uni => 
            uniData[0].uni === uni._id)?.color

        return color || baseColor 
    }

   
    return {
        unis,
        selUnis,
        selectUni,
        getTreeColor,
        steps
    }
}

export default useStepsGlobal
