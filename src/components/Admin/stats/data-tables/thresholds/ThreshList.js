import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { getThreshsByFieldAndType } from '../../../../../redux/selectors/datatables'
import AddThreshold from './AddThreshold'
import ThreshItem from './ThreshItem'

function ThreshList({ tableId, selField, threshType }) {
    // Get thresholds by type and field
    const thresholds = useSelector(getThreshsByFieldAndType(
        tableId,
        selField,
        threshType))

    const [displayAdd, setDisplayAdd] = useState(false)
    console.log(thresholds);

    return (
        <ul className={"thresh-list " + threshType}>
            {thresholds.length === 0 
            ? <p>אין סיפים</p>
            : thresholds.map(thresh => 
                <ThreshItem
                key={thresh._id} 
                thresh={thresh}
                tableId={tableId} /> )
            }
            
            <li key='newThresh'>
            {displayAdd
                ?   <AddThreshold
                    selField={selField}
                    tableId={tableId}
                    threshType={threshType} />

                :   <div className="display-add-but">
                        <i 
                        className="material-icons"
                        onClick={() => setDisplayAdd(true)}>
                            add
                        </i>
                    </div>
            }
               
               
            </li>
        </ul>
    )
}

export default ThreshList
