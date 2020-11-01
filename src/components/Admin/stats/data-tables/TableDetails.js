import React, { useEffect, useState } from 'react'
import { toggleEnabled } from '../../../../redux/actions/datatables'
import Modal from '../../../layout/Modal'
import EditSection from './EditSection'

function TableDetails({ table, display, toggleModal }) {
    const [selectedLink, setSelectedLink] = useState('edit')

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

    const links = {
        selectLink,
        selected: selectedLink,
        linksList
    }

    return (
        <Modal 
        display={display}
        toggleModal={toggleModal}
        title={table.name}
        links={links}>
            {selectedLink === "edit" && <EditSection table={table} />}
        </Modal>
    )
}

export default TableDetails
