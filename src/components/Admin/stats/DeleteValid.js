import React, { useState, Fragment } from 'react';
import { deleteValid } from '../../../redux/actions/datafields';
import VerifyDelete from '../../common/VerifyDelete';

function DeleteValid({ valid, fieldId }) {
    const [display, setDisplay] = useState(false)

    const toggleModal = open => {
        setDisplay(open)
    }
    
    return (
        <Fragment>
            <i
            className="material-icons"
            onClick={() => toggleModal(true)}>
                clear
            </i>
            <VerifyDelete
            display={display}
            toggleModal={toggleModal}
            callback={deleteValid}
            values={[fieldId, valid._id]}
            />
        </Fragment>
    )
}

export default DeleteValid
