import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { getGroups } from '../../../redux/announcements/groups/actions'
import ViewAncs from '../../announcements/ViewAncs/ViewAncs'
import ViewAncsProvider from '../../announcements/ViewAncs/ViewAncsContext'
import TopBar from './TopBar/TopBar'

function AncAdmin() {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getGroups())
    }, [])

    return (
        <div>
            <TopBar />
            <ViewAncs isAdmin={true} />
        </div>
    )
}

export default AncAdmin
