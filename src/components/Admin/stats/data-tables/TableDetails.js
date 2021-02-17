import React, { useState } from 'react'
import Modal from '../../../layout/Modal'
import EditSection from './EditSection'
import Thresholds from './thresholds/Thresholds'

function TableDetails({ table, display, toggleModal }) {
    const [selectedLink, setSelectedLink] = useState('edit')

    const linksList = [
        {
            name: "עריכה",
            loc: "edit",
            id: "edit"
        },
        {
            name: "סיפים",
            loc: "thresholds",
            id: "thresholds"
        }
    ]

    const selectLink = loc => {
        setSelectedLink(loc);
    }

    const links = {
        selectLink,
        selected: selectedLink,
        linksList
    }

    console.log(selectedLink);

    return (
        <Modal 
        display={display}
        toggleModal={toggleModal}
        title={table.name}
        links={links}>
            {selectedLink === "edit" && 
                <EditSection table={table} />}
            {selectedLink === "thresholds" && 
                <Thresholds tableId={table._id} />}
        </Modal>
    )
}

export default TableDetails
