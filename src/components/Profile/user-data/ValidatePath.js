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
    const data = dataSelector.data;
    const loadData = dataSelector.loading;
    // const [data, setData] = useState({})

    // useEffect(() => {
    //     setData(fetchedData)
    // }, [fetchedData])


    if(loadData)
        return <Loadbar />

    else if(data && Object.keys(data).length !== 0) {
        return <UserStats data={data} />
    }

    else  {
        return <ChoosePath />
    }
}

export default ValidatePath
