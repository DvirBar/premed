import React from 'react';
import Modal from '../layout/Modal';
import useDataOrdering from './data-table/field-options/useDataOrdering';
import Filters from './data-table/field-options/filters/Filters';

function FieldOptions({ 
    display, 
    toggleModal, 
    title }) {
 
    const {
        addFilter
    } = useDataOrdering(toggleModal)
    
    return (
        <Modal
        display={display}
        toggleModal={toggleModal}
        title={title}>
            <div className="field-options">
                <Filters 
                toggleModal={toggleModal} />
                <button onClick={() => addFilter()}>החלה</button>
            </div>
        </Modal>  
    )
}

export default FieldOptions
