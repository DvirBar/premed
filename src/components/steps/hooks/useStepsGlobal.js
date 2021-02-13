import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { stepsFilterUnis } from '../../../redux/actions/steps';
import { getStepsByUnis } from '../../../redux/selectors/steps';
import { getUnisByPath } from '../../../redux/selectors/unis';
import { addOrRemove } from '../../../utils/arrays'
import { isSingleMatch } from './utils';

function useStepsGlobal(pathId) {
    const unis = useSelector(getUnisByPath(pathId))
    const [hasInit, setHasInit] = useState(false)
    const [selUnis, setSelUnis] = useState([])
    
    const selectUni = uniObj => {
        let stageUnis = addOrRemove(selUnis, uniObj.value)
        if(stageUnis.length > 0) {
            setSelUnis(stageUnis)
        }
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

    // Match tree color according to relvant university
    const getTreeColor = uniData => {
        const baseColor = '#486974'
        const singleUni = isSingleMatch(uniData, selUnis)

        if(singleUni) {
            const color = unis?.find(uni => 
                singleUni === uni._id)?.color

            return color || baseColor
        }

        return baseColor;
    }

    const getUniContent = step => {
        const uniData = step?.uniData
        const uniContent = {}
        
        if(uniData) {
            for(let uniItem of uniData) {
                if(uniItem.content?.length > 0) {
                    uniContent[uniItem.uni] = uniItem.content
                }
            }
        }

        return uniContent
    }

   
    return {
        unis,
        selUnis,
        selectUni,
        getTreeColor,
        steps,
        getUniContent
    }
}

export default useStepsGlobal
