import React, { useState } from 'react'
import Modal from '../../layout/Modal'

function LibInfo({ lib }) {
    const [display, setDisplay] = useState(false)

    const toggleDisplay = toggle => {
        setDisplay(toggle)
    }

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
                <div dangerouslySetInnerHTML={{__html: lib.info}}/>
            </Modal>
        </div>
    )
}

export default LibInfo
