import React, { useState } from 'react';
import Modal from '../layout/Modal';
import AncDetails from './AncDetails';
import moment from 'moment';

function AncItem(props) {
    const anc = props.anc;
    const [display, setDisplay] = useState(false);

    const toggleModal = open => {
        setDisplay(open)
    }

    return (
        <div className="anc-item">
            <span className="anc-date">
                {moment(anc.date).format("D בMMMM")}
            </span><br/>
            <span className="anc-title" onClick={() => toggleModal(true)}>{anc.title}</span>

            <Modal display={display} toggleModal={toggleModal} >
                <AncDetails anc={anc} />
            </Modal>
        </div>
    )
}

export default AncItem;
