import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { filterData, clearFilters, sortData } from '../../redux/actions/userdata';
import Modal from '../layout/Modal';
import Dropdown from '../common/Dropdown';
import BorderTextbox from '../common/BorderTextbox';
import useDataOrdering from './data-table/field-options/useDataOrdering';
import Filters from './data-table/field-options/filters/Filters';
import SortFields from './data-table/field-options/SortFields';

function FieldOptions({ 
    display, 
    toggleModal, 
    title }) {

    const setDataOrdering = useDataOrdering(toggleModal)

    return (
        <Modal
        display={display}
        toggleModal={toggleModal}
        title={title}>
            <div className="field-options">
                <Filters />
                <SortFields />
                <button onClick={() => setDataOrdering()}>החלה</button>
            </div>
        </Modal>
    )
}

export default FieldOptions
