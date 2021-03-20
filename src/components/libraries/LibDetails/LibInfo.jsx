import React, { useContext, useState } from 'react'
import EditInfo from '../../admin/libraries/EditLibrary/EditInfo'
import Modal from '../../layout/Modal'
import { LibraryContext } from '../LibraryContext'

function LibInfo({ lib }) {
    const [display, setDisplay] = useState(false)

    const toggleDisplay = toggle => {
        setDisplay(toggle)
    }

    const { isAdmin }= useContext(LibraryContext) 

    return (
        <div>
            <div 
            className="inline-button"
            onClick={() => toggleDisplay(true)}
            role="button">
                מידע כללי
            </div>
            <Modal
            title={lib.name}
            display={display}
            toggleModal={toggleDisplay}>
                {isAdmin
                ?   <EditInfo lib={lib} />
                :   <div dangerouslySetInnerHTML={{__html: lib.info}}/>   
                }
            </Modal>
        </div>
    )
}

export default LibInfo
