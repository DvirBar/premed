import React, { useEffect, Fragment, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTables } from '../../../redux/actions/datatables';
import { getOneUserData } from '../../../redux/actions/userdata';
import { isObjEmpty } from '../../../utils/objects';
import Loadbar from '../../layout/Loadbar';
import Calculator from './calculator/Calculator';
import ChooseBaseData from './ChooseBaseData/ChooseBaseData';
import NewTable from './constructors/NewTable/NewTable';
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
        
    console.log(data);
    const [displayCalc, setDisplayCalc] = useState(false)
    
    if(loading)
        return <Loadbar />

    else if(data?.tableData && !isObjEmpty(data?.tableData) && Object.keys(data).length !== 0) {
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

    else if(!isObjEmpty(data)) {
        return <NewTable />
    }

    else  {
        return <ChooseBaseData />
    }
}

export default ValidatePath
