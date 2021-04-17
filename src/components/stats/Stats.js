import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { getTables } from '../../redux/actions/datatables';
import StatsRouter from './StatsRouter';

function Stats() {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getTables())
    }, [])

    return (
        <StatsRouter />
    )
}

export default Stats
