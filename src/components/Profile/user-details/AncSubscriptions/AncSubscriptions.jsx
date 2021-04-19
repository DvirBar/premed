import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUserSubs, groupCommitSubscriptions } from '../../../../redux/announcements/groups/actions'
import { getGroups } from '../../../../redux/announcements/groups/selectors'
import CardContainer from '../../../layout/CardContainer/CardContainer'
import CardContent from '../../../layout/CardContainer/CardContent'
import CardHeader from '../../../layout/CardContainer/CardHeader'
import CardInfo from '../../../layout/CardContainer/CardInfo'
import CardTitle from '../../../layout/CardContainer/CardTitle'
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
        <CardContainer>
            <CardHeader>
                <CardTitle>
                    הרשמה לפרסומים  
                </CardTitle>
                <CardInfo>
                    סמנו את הקבוצות שברצונכם לקבל פרסומים עבורן
                </CardInfo>
            </CardHeader>
            <CardContent>
                <AncsList />
                <button onClick={updateSubs}>עדכון</button>
            </CardContent>
        </CardContainer>
    )
}

export default AncSubscriptions
