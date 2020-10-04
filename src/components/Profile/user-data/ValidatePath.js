import React, { useState, useEffect, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getOneUserData } from '../../../redux/actions/userdata';
import Loadbar from '../../layout/Loadbar';
import SoftLoadbar from '../../layout/SoftLoadBar';
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
    const loadSoft = dataSelector.softLoading;
    const [data, setData] = useState({})

    useEffect(() => {
        setData(fetchedData)
    }, [fetchedData])


    if(loadData)
        return <Loadbar />

    else if(data && Object.keys(data).length !== 0) {
        return (
            <Fragment>
               
               {loadSoft &&
                    <SoftLoadbar message="שמירה מתבצעת" />
               }

                <UserStats data={data} />
            </Fragment>
        )
    }

    else  {
        return <ChoosePath />
    }
}

export default ValidatePath
