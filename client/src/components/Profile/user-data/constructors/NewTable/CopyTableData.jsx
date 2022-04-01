import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { copyData } from '../../../../../redux/actions/userdata';
import { selTableSelector } from '../../../../../redux/selectors/userdata';
import AddNewEmptyTable from './AddNewEmptyTable';

export default function CopyTableData({ setDisplayAddNewTable }) {
  const dispatch = useDispatch(); 

  const selTableId = useSelector(selTableSelector);

  const commitDataCopy = () => {
    console.log(selTableId);
    if(selTableId)
      dispatch(copyData(selTableId));
  }
  
  return (
    <div className="copy-data">
        <button onClick={commitDataCopy}>כן, העתיקו</button>
        <button onClick={() => setDisplayAddNewTable(true)}>לא, תודה</button>
    </div>
  )
}
