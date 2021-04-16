import React, { useState } from 'react'
import { deleteQuestGroup } from '../../../redux/questions/actions'
import VerifyDelete from '../../common/VerifyDelete'

function DeleteQuestionGroup({ groupId }) {
    const [display, setDisplay] = useState(false)
    
    return (
        <div>
            <button 
            onClick={() => setDisplay(true)}
            className="danger">
                מחיקה
            </button>

            <VerifyDelete
            callback={deleteQuestGroup}
            values={[groupId]}
            display={display}
            toggleModal={setDisplay} />
        </div>
       
    )
}

export default DeleteQuestionGroup
