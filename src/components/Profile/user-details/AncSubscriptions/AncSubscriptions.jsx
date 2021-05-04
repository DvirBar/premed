import React, { useEffect } from 'react'
import { Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUserSubs, groupCommitSubscriptions } from '../../../../redux/announcements/groups/actions'
import { getGroups } from '../../../../redux/announcements/groups/selectors'
import { GROUP_COMMIT_SUBSCRIPTION } from '../../../../redux/announcements/groups/types'
import { isLoading } from '../../../../redux/loader/selectors'
import CardContainer from '../../../layout/Containers/CardContainer/CardContainer'
import CardContent from '../../../layout/Containers/CardContainer/CardContent'
import CardHeader from '../../../layout/Containers/CardContainer/CardHeader'
import CardInfo from '../../../layout/Containers/CardContainer/CardInfo'
import CardTitle from '../../../layout/Containers/CardContainer/CardTitle'
import Loadbar from '../../../layout/Loadbar'
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

    const loading = useSelector(isLoading(GROUP_COMMIT_SUBSCRIPTION))

    return (
        <CardContainer>
            <CardHeader>
                <CardTitle>
                    הרשמה לפרסומים  
                </CardTitle>
                <CardInfo>
                    סמנו את הקבוצות שברצונכם לקבל התראות במייל עבורן
                </CardInfo>
            </CardHeader>
            <CardContent>
                <AncsList />
                <div className="anc-subscribe-commit-block">
                    <button 
                    disabled={loading}
                    onClick={updateSubs}>
                    {loading
                    ?   <Loadbar small={true} />
                    :   <Fragment>
                            עדכון
                        </Fragment>
                    }
                    </button>
                </div>
            </CardContent>
        </CardContainer>
    )
}

export default AncSubscriptions
