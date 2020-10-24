import React, { Fragment, useState } from 'react'
import Modal from '../../layout/Modal';

function AddInquiry() {
    const [display, setDisplay] = useState(false)

    const toggleModal = toggle => {
        setDisplay(toggle)
    }

    const [defaultValues, setDefaultValues] = useState({
    })
    
    return (
        <Fragment>
            <i className="material-icons">
                add
            </i>
            <Modal
            display={display}
            toggleModal={toggleModal}
            title="פניה חדשה">
                <form>

                </form>
            </Modal>
        </Fragment>
    )
}

export default AddInquiry
