import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import AddNewEmptyTable from './AddNewEmptyTable';

export default function CopyTableData({ setDisplayAddNewTable }) {
  const dispatch = useDispatch(); 
  
  return (
    <div className="copy-data">
        <button>כן, העתיקו</button>
        <button onClick={() => setDisplayAddNewTable(true)}>לא, תודה</button>
    </div>
  )
}
