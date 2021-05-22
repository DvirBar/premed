import React, { useEffect, Fragment, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTables } from '../../../redux/actions/datatables';
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
        dispatch(getTables())
    }, [])

    const { 
        data, 
        loading, 
        selTable } = useSelector(state => 
        state.userdata);

    const [displayCalc, setDisplayCalc] = useState(false)

    if(loading)
        return <Loadbar />

    else if(data && Object.keys(data).length !== 0) {
        return (
            <Fragment>
                <GroupsProvider isSimulated={false}>
                    <UserStats 
                    setDisplayCalc={setDisplayCalc}
                    data={data} 
                    selTable={selTable} />
                </GroupsProvider>
                <Calculator 
                display={displayCalc}
                setDisplay={setDisplayCalc} />
            </Fragment>
        )
    }

    else  {
        return <ChooseBaseData />
    }
}

export default ValidatePath
