import React from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { getPriorityTable } from '../../../../redux/selectors/datatables';
import { selTableSelector } from '../../../../redux/selectors/userdata';

function TableDisabled({ changeTable }) {
  const selTableId = useSelector(selTableSelector);
  const priorityTableId = (useSelector(getPriorityTable))._id; 

  
  if(selTableId === priorityTableId)
    return <></>

  return (
    <div className="informative_yellow">
      <p>
        <b>טבלה זו סגורה, </b>
         תוכלו לצפות בציונכם בשנת מיונים זו אבל לא תוכלו לערוך אותה.
      </p>
      <p>
        מתמיינים גם השנה ? 
        <Link onClick={() => changeTable(priorityTableId)}> לחצו להזנת נתונים</Link>
      </p>
    </div>
  )
}

export default TableDisabled