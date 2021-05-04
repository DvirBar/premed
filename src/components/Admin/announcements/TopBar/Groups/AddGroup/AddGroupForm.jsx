import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import useForm from '../../../../../../forms/useForm';
import { getAllPaths } from '../../../../../../redux/selectors/paths';
import { addGroup } from '../../../../../../redux/announcements/groups/actions';
import Dropdown from '../../../../../common/Dropdown';
import FormInput from '../../../../../common/FormInput';
import Modal from '../../../../../layout/Modal';

function AddGroupForm({ display, toggleDisplay }) {
    const [defaultValues] = useState({
        name: '',
        path: ''
    })

    const {
        handleChange,
        handleSubmit,
        values,
        errors
    } = useForm(addGroup, defaultValues)

    const paths = useSelector(getAllPaths)
    const options = paths.map(path => ({
        name: path.name,
        value: path._id
    }))

    
    return (
        <Modal
        display={display}
        toggleModal={toggleDisplay}
        title="קבוצת פרסומים חדשה">
            <form onSubmit={handleSubmit}>
                <FormInput
                name="name"
                type="text"
                label="שם"
                value={values.name}
                onChange={handleChange}
                error={errors.name} />

                <Dropdown 
                options={options}
                name="path"
                onChange={handleChange}
                placeholder="בחירה"
                title="מסלול" />

                <button type="submit">
                    יצירה
                </button>
            </form>
        </Modal>
    )
}

export default AddGroupForm
