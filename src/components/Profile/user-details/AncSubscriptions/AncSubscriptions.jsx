import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUserSubs, groupCommitSubscriptions } from '../../../../redux/announcements/groups/actions'
import { getGroups } from '../../../../redux/announcements/groups/selectors'
import AncsList from './AncsList/AncsList'

function AncSubscriptions() {
    const dispatch = useDispatch()
    
    useEffect(() => {
        dispatch(getUserSubs())
    }, [])

    const groups = useSelector(getGroups)

    const updateSubs = () => {
        dispatch(groupCommitSubscriptions(groups))
    }

    return (
        <div className="card-container">
            <h1 className="card-header">
                הרשמה לפרסומים
            </h1>
            <span className="card-info">
                סמנו את הקבוצות שברצונכם לקבל פרסומים עבורן
            </span>
            <div className="card-content">
                <AncsList />
                <button onClick={updateSubs}>עדכון</button>
            </div>
        </div>
    )
}

export default AncSubscriptions
