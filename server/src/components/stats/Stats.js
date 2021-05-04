import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getTables } from '../../redux/actions/datatables';
import { TABLE } from '../../redux/actions/types';
import { isLoading } from '../../redux/loader/selectors';
import ContentContainer from '../layout/Containers/ContentContainer/ContentContainer';
import Loadbar from '../layout/Loadbar';
import StatsRouter from './StatsRouter';

function Stats() {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getTables())
    }, [])

    const loading = useSelector(isLoading(TABLE))

    if(loading) {
        return (
            <ContentContainer>
                <Loadbar />
            </ContentContainer>
        )
    } 
    
    return (
        <StatsRouter />
    )
}

export default Stats
