import React, { useState } from 'react'
import LabelButton from '../../../../common/buttons/LabelButton'
import AddContent from './AddContent'

function AddSummaryGroup({ stepId, sumId }) {
    const [displayAdd, setDisplayAdd] = useState(false)
    const toggleAdd = toggle => {
        setDisplayAdd(toggle)
    }
    return (
        <div className="add-summary-group">
            {displayAdd 
            ?   <div className="summary-group-item">
                    <AddContent
                    stepId={stepId}
                    sumId={sumId}
                    isNewGroup={true}
                    toggleDisplay={toggleAdd}/>
                </div>

            :   <LabelButton
                label="קבוצה חדשה"
                icon="add"
                onClick={() => setDisplayAdd(true)} />   
            }
        </div>
    )
}

export default AddSummaryGroup
