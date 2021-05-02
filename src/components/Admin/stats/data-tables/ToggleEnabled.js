import React from 'react'
import { useDispatch } from 'react-redux'
import { toggleEnabled } from '../../../../redux/actions/datatables';

function ToggleEnabled({ table }) {
    const dispatch = useDispatch();

    return (
        <div className="toggle-enabled">
            {table.enabled 
            ? <span
               className="disable-table"
               onClick={() => dispatch(toggleEnabled(table._id))}>
                סגירת טבלה
              </span>
            : <span 
               className="enable-table"
               onClick={() => dispatch(toggleEnabled(table._id))}>
                פתיחת טבלה
              </span>
            }
            
            <div className="enabling-info">
                .פתיחת הטבלה תאפשר זרימה של מידע אליה בלבד ותסגור טבלה פעילה אחרת
            </div>
        </div>
    )
}

export default ToggleEnabled
