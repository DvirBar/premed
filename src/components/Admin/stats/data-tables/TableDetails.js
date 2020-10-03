import React, { useState } from 'react'
import { toggleEnabled } from '../../../../redux/actions/datatables'
import Modal from '../../../layout/Modal'
import EditSection from './EditSection'

function TableDetails({ table, display, toggleModal }) {
    const [selectedLink, setSelectedLink] = useState('')

    const linksList = [
        {
            name: "עריכה",
            loc: "edit"
        },
        {
            name: "סיפים",
            loc: "thresholds"
        }
    ]

    const selectLink = loc => {
        setSelectedLink(loc);
    }

    return (
        <Modal 
        display={display}
        toggleModal={toggleModal}
        title={table.name}
        linksList={linksList}
        selectLink={selectLink}>
            {selectedLink === "edit" && <EditSection table={table} />}
            
        </Modal>
    )
}

export default TableDetails
