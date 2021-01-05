import React, { useContext } from 'react';
import Modal from '../layout/Modal';
import useDataOrdering from './data-table/field-options/useDataOrdering';
import Filters from './data-table/field-options/filters/Filters';
import SortFields from './data-table/field-options/SortFields';
import { FieldOptionsContext } from './data-table/field-options/FieldOptionsContext';

function FieldOptions({ 
    display, 
    toggleModal, 
    title }) {

    const { field } = useContext(FieldOptionsContext)
 
    const setDataOrdering = useDataOrdering(toggleModal)

    return (
        <Modal
        display={display}
        toggleModal={toggleModal}
        title={title}>
            <div className="field-options">
                <Filters />
                {field.dataType?.value === 'num' &&
                    <SortFields />
                }
                <button onClick={() => setDataOrdering()}>החלה</button>
            </div>
        </Modal>
    )
}

export default FieldOptions
