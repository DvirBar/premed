import React from 'react'
import { useSelector } from 'react-redux';
import { getPriorityTable } from '../../../../../redux/selectors/datatables';
import { selTableSelector } from '../../../../../redux/selectors/userdata';

function SuggestTable() {
    const selTableId = useSelector(selTableSelector);
    const priorityTableId = (useSelector(getPriorityTable))._id; 

    if(selTableId !== priorityTableId) {
        return (
            <div>SuggestTable</div>
        )
    }

    return <></>
    
}

export default SuggestTable;
