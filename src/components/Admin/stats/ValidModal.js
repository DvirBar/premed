import React from 'react'; 
import Modal from '../../layout/Modal';
import AddValid from './AddValid';
import ValidatorsList from './ValidatorsList';

function ValidModal({ field, types, display, toggleModal }) {
    return (
        <Modal
        display={display}
        toggleModal={toggleModal}
        title={'מאמתים עבור ' + field.name}
        subTitle={field.university?.name}>
            <AddValid 
            field={field}
            validTypes={types.validationTypes} />

            <ValidatorsList 
            fieldValids={field.validators}
            types={types}
            field={field} />
        </Modal>
    )
}

export default ValidModal
