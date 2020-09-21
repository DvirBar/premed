import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getOneUserData } from '../../../redux/actions/userdata';
import Loadbar from '../../layout/Loadbar';
import ChoosePath from './ChoosePath';
import UserStats from './UserStats';

function ValidatePath() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getOneUserData());
    }, [])

    const dataSelector = useSelector(state => state.userdata);
    const fetchedData = dataSelector.data;
    const loadData = dataSelector.loading;
    const [data, setData] = useState({})

    useEffect(() => {
        setData(fetchedData)
    }, [fetchedData])

    if(loadData)
        return <Loadbar />

    else if(!data || data.paths?.length === 0) {
        return <ChoosePath />
    }

    else  {
        return <UserStats data={data} />
    }
}

export default ValidatePath
