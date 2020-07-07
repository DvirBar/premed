import React, { useState } from 'react';
import Modal from '../layout/Modal';
import AncDetails from './AncDetails';

function AncItem(props) {
    const anc = props.anc;
    const [display, setDisplay] = useState(false)

    const openModal = () => {
        setDisplay(true)
    }

    return (
        <p className="anc-item" onClick={openModal}>
            <span className="anc-date">{anc.date}</span>
            <span className="anc-title">{anc.title}</span>

            <Modal display={display} setDisplay={setDisplay}>
                <AncDetails anc={anc} />
            </Modal>
        </p>
    )
}

export default AncItem;
