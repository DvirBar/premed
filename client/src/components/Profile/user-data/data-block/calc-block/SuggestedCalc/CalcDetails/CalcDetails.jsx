import React from 'react'
import Modal from '../../../../../../layout/Modal'
import PayloadInfo from './PayloadInfo/PayloadInfo'

function CalcDetails({ display, setDisplay, payload, calcName }) {
    const title = `${calcName}`
    return (
        <Modal
        title={title}
        display={display}
        toggleModal={setDisplay}>
            {payload &&
                <PayloadInfo
                payload={payload} />                
            }
        </Modal>
    )
}

export default CalcDetails
