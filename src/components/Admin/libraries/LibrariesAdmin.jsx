import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { getLibraries } from '../../../redux/libraries/actions'
import PathsSelector from '../../common/PathsSelector'
import Libraries from '../../libraries/Libraries'
import LibraryProvider from '../../libraries/LibraryContext'
import AddLibrary from './AddLibrary/AddLibrary'

function LibrariesAdmin() {
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
        <div className="libraries-admin">
            <PathsSelector
            selPath={selPath}
            selectPath={selectPath} />
            <AddLibrary />
            <LibraryProvider isAdmin={true}>
                <Libraries />
            </LibraryProvider>
        </div>
    )
}

export default LibrariesAdmin
