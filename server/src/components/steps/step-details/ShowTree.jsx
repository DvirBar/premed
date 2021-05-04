import React, { Fragment, useState } from 'react'
import FloatButton from '../../layout/FloatButton'
import Modal from '../../layout/Modal'
import PathSteps from '../‎PathSteps'

function ShowTree() {
    const [displayModal, setDisplayModal] = useState(false)
    const toggleModal = toggle => {
        setDisplayModal(toggle)
    }
    return (
        <Fragment>
            <FloatButton
            toolTip="מסלול"
            onClick={() => setDisplayModal(true)}>
                <i className="material-icons float-button">
                    timeline
                </i>
            </FloatButton>
            <Modal
            display={displayModal}
            toggleModal={toggleModal}
            title="מסלול הקבלה">
                <PathSteps />
            </Modal>
        </Fragment>
    )
}

export default ShowTree
