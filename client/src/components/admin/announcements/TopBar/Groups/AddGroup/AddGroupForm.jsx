import React, { useState } from 'react';
import useForm from '../../../../../../forms/useForm';
import { addGroup } from '../../../../../../redux/announcements/groups/actions';
import FormInput from '../../../../../common/FormInput';
import Modal from '../../../../../layout/Modal';
import ChoosePaths from '../../../../../Profile/user-data/TopBar/ChoosePaths/ChoosePaths';

function AddGroupForm({ display, toggleDisplay }) {
    const [defaultValues] = useState({
        name: '',
        paths: []
    })

    const {
        handleChange,
        handleSubmit,
        values,
        errors
    } = useForm(addGroup, defaultValues)
    
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

                <ChoosePaths 
                name="paths"
                selPaths={values.paths}
                onChange={handleChange} />

                <button type="submit">
                    יצירה
                </button>
            </form>
        </Modal>
    )
}

export default AddGroupForm
