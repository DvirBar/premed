import React, { useState } from 'react'
import { deleteLibrary } from '../../../../redux/libraries/actions';
import VerifyDelete from '../../../common/VerifyDelete';

function DeleteLibrary({ libId }) {
    const [display, setDisplay] = useState(false)
    const toggleDisplay = toggle => {
        setDisplay(toggle)
    }
    
    return (
        <div>
            <div
            onClick={() => toggleDisplay(true)}
            className="inline-button danger"
            role="button">
                מחיקה
            </div>

            <VerifyDelete
            display={display}
            toggleModal={toggleDisplay}
            callback={deleteLibrary}
            values={[libId]} />
        </div>
    )
}

export default DeleteLibrary
