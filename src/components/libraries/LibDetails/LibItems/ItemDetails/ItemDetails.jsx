import React from 'react'
import Modal from '../../../../layout/Modal'

function ItemDetails({ item, display, toggleDisplay }) {
    const title = "הסבר על " + item.name
    
    return (
        <Modal
        title={title}
        display={display}
        toggleModal={toggleDisplay}>
            {item.info}
        </Modal>
    )
}

export default ItemDetails
