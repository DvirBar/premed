import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'
import { getStatsInputs } from '../../../redux/actions/basedata'
import { STATS_INPUTS } from '../../../redux/actions/types'
import { isLoading } from '../../../redux/loader/selectors'
import { getUnisByPath } from '../../../redux/selectors/unis'
import Loadbar from '../../layout/Loadbar'
import UniThresholds from './UniThresholds/UniThresholds'

function Thresholds() {
    const {
        pathId
    } = useParams()

    const unis = useSelector(getUnisByPath(pathId))

    const dispatch = useDispatch()
    
    useEffect(() => {
        dispatch(getStatsInputs([pathId]))
    }, [pathId])

    const loading = useSelector(isLoading(STATS_INPUTS))

    if(loading) {
        return <Loadbar />
    }

    return (
        <div className="thresholds">
            <div className="thresholds__contact-us">
                יש לכם עדכון סכם קבלה או דחייה? ראיתם סכמים שגויים או לא נכונים?
                &nbsp;<a href="https://m.me/100015029253568"
                target="_blank"
                rel="noopener noreferrer">
                    דברו איתנו
                </a>!
            </div>
            {unis.map(uni => 
                <UniThresholds 
                key={uni._id}
                uni={uni} />
            )}
        </div>
    )
}

export default Thresholds
