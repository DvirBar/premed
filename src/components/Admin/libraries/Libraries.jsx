import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { getLibraries } from '../../../redux/libraries/actions'
import PathsSelector from '../../common/PathsSelector'
import AddLibrary from './AddLibrary/AddLibrary'

function Libraries() {
    const [selPath, setSelPath] = useState('')
    const selectPath = (option) => {
        setSelPath(option.value)
    }

    const dispatch = useDispatch()

    useEffect(() => {
        if(selPath) {
            dispatch(getLibraries(selPath))
        }
    }, [selPath])

    return (
        <div>
            <PathsSelector
            selPath={selPath}
            selectPath={selectPath} />
            <AddLibrary />
        </div>
    )
}

export default Libraries
