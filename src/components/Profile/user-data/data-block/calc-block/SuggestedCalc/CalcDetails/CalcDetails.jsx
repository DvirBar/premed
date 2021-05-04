import React, { useContext } from 'react'
import Modal from '../../../../../../layout/Modal'
import { SectionContext } from '../../../../SectionContext'
import PayloadInfo from './PayloadInfo/PayloadInfo'

function CalcDetails({ display, setDisplay, payload, calcName }) {
    const {
        uni
    } = useContext(SectionContext)    

    const title = `${calcName}${uni ? ' ' + uni.name : ''}`
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
