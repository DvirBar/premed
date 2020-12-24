import React, { useState, useEffect, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getOneUserData } from '../../../redux/actions/userdata';
import Loadbar from '../../layout/Loadbar';
import SoftLoadbar from '../../layout/SoftLoadBar';
import Calculator from './calculator/Calculator';
import ChoosePath from './ChoosePath';
import GroupsProvider from './data-block/GroupsContext';
import UserStats from './UserStats';

function ValidatePath() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getOneUserData());
    }, [])

    const { data, loading, softLoading, selTable } = useSelector(state => 
        state.userdata);


    if(loading)
        return <Loadbar />

    else if(data && Object.keys(data).length !== 0) {
        return (
            <Fragment>
               
               {softLoading &&
                    <SoftLoadbar message="שמירה מתבצעת" />
               }
                <GroupsProvider isSimulated={false}>
                    <UserStats data={data} selTable={selTable} />
                </GroupsProvider>
                <Calculator />
            </Fragment>
        )
    }

    else  {
        return <ChoosePath />
    }
}

export default ValidatePath
