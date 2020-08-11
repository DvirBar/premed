import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import VerifyDelete from '../../common/VerifyDelete';
import { deleteStep } from '../../../redux/actions/steps';

function DeleteStep({ stepId }) {
    const [display, setDisplay] = useState(false)

    const toggleVerDelete = open => {
        setDisplay(open)
    }

    return (
        <Fragment>
            <button 
            className={"danger"}
            onClick={() => toggleVerDelete(true)}>מחק</button>
            <VerifyDelete
            callback={deleteStep}
            value={stepId}
            display={display} 
            toggleModal={toggleVerDelete} />
        </Fragment>
    )
}

DeleteStep.propTypes = {
    stepId: PropTypes.string.isRequired
}

export default DeleteStep
