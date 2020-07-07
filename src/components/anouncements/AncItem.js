import React, { useState } from 'react';
import Modal from '../layout/Modal';
import AncDetails from './AncDetails';
import moment from 'moment';

function AncItem(props) {
    const anc = props.anc;
    const [display, setDisplay] = useState(false);

    const openModal = () => {
        setDisplay(true)
    }

    return (
        <p className="anc-item">
            <span className="anc-date">
                {moment(anc.date).format("D בMMMM")}
            </span><br/>
            <span className="anc-title" onClick={openModal}>{anc.title}</span>

            <Modal display={display} setDisplay={setDisplay} title={anc.title}>
                <AncDetails anc={anc} />
            </Modal>
        </p>
    )
}

export default AncItem;
