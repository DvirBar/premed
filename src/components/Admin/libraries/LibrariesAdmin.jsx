import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { generatePath, useHistory, useParams, useRouteMatch } from 'react-router'
import { getLibraries } from '../../../redux/libraries/actions'
import PathsSelector from '../../common/PathsSelector'
import Libraries from '../../libraries/Libraries'
import LibraryProvider from '../../libraries/LibraryContext'

function LibrariesAdmin() {
    const { path } = useRouteMatch()
    const history = useHistory()
    const { pathId } = useParams()

    const selectPath = option => {
        const newPath = generatePath(path, 
            { pathId: option.value })

        history.push(newPath)
    }

    const dispatch = useDispatch()

    useEffect(() => {
        if(pathId) {
            dispatch(getLibraries(pathId))
        }
    }, [pathId])

    return (
        <div className="libraries-admin">
            <PathsSelector
            selPath={pathId}
            selectPath={selectPath} />
            <LibraryProvider isAdmin={true}>
                <Libraries />
            </LibraryProvider>
        </div>
    )
}

export default LibrariesAdmin
