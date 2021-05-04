import React, { useEffect, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getOneUserData } from '../../../redux/actions/userdata';
import Loadbar from '../../layout/Loadbar';
import Calculator from './calculator/Calculator';
import ChooseBaseData from './ChooseBaseData/ChooseBaseData';
import GroupsProvider from './data-block/GroupsContext';
import UserStats from './UserStats';

function ValidatePath() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getOneUserData());
    }, [])

    const { 
        data, 
        loading, 
        selTable } = useSelector(state => 
        state.userdata);


    if(loading)
        return <Loadbar />

    else if(data && Object.keys(data).length !== 0) {
        return (
            <Fragment>
                <GroupsProvider isSimulated={false}>
                    <UserStats data={data} selTable={selTable} />
                </GroupsProvider>
                <Calculator />
            </Fragment>
        )
    }

    else  {
        return <ChooseBaseData />
    }
}

export default ValidatePath
