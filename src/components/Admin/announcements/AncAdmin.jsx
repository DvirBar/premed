import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { getAncs } from '../../../redux/announcements/ancs/actions'
import { getGroups } from '../../../redux/announcements/groups/actions'
import TopBar from './TopBar/TopBar'

function AncAdmin() {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getGroups())
        dispatch(getAncs())
    }, [])

    return (
        <div>
            <TopBar />
        </div>
    )
}

export default AncAdmin
