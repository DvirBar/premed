import { useCallback, useContext, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import useMinUnits from '../hooks/useMinUnits'
import useMissingArgs from '../hooks/useMissingArgs'
import { GroupsContext } from './GroupsContext'

export const hasGroupValues = (values, group) => {
    for(let field of group.fields) {
        if(!values.find(val => 
            val.field === field._id && 
            val.group === group._id))
            return false
    }
    
    return true
}


function useDataValidation(storedCalcs, dataVals) {
    const [finishSequence, setFinishSequence] = useState(false)

    const changeSeqStatus = useCallback(status => {
        setFinishSequence(status)
    }, [])

    console.log(storedCalcs);

    const { missingArgs, finished } = useMissingArgs(storedCalcs, dataVals)

    const minUnits = useMinUnits(
        missingArgs, 
        finished, 
        changeSeqStatus,
        dataVals)
    
    const {
        validError
    } = useContext(GroupsContext)

    const dispatch = useDispatch()
    const [errArr, setErrArr] = useState([])


    useEffect(() => {
        if(finishSequence) {
            setErrArr([
                ...missingArgs,
                ...minUnits
            ])
        }
    }, [finishSequence])

    useEffect(() => {
        dispatch(validError(errArr))
        setFinishSequence(false)
    }, [errArr])
}

export default useDataValidation
