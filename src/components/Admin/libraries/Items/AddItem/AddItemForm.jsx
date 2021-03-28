import React, { useState } from 'react'
import useForm from '../../../../../forms/useForm'
import { addLibItem } from '../../../../../redux/libraries/actions';
import FormInput from '../../../../common/FormInput';
import UrlInput from '../../../../common/forms/UrlInput/UrlInput';
import Editor from '../../../../common/forms/Editor/Editor';
import Modal from '../../../../layout/Modal';
import IconsSelect from '../IconSelect/IconsSelect';
import AddMeta from './AddMeta';

function AddItemForm({ display, toggleModal, libId }) {
    const [defaultValues, setDefaultValues] = useState({
        name: '',
        icon: '',
        link: '',
        meta: {}
    })
    
    const {
        handleChange,
        handleSubmit,
        values,
        errors
    } = useForm(addLibItem, defaultValues, libId)

    return (
        <Modal
        display={display}
        toggleModal={toggleModal}
        title="קובץ חדש">
            <form 
            onSubmit={handleSubmit}
            className="add-item-form">
                <FormInput
                label="שם"
                type="text"
                name="name"
                value={values.name}
                onChange={handleChange}
                error={errors.name} />

                <AddMeta
                handleChange={handleChange}
                values={values}
                errors={errors} />
                
                <UrlInput
                url={values.link}
                onChange={handleChange}
                name="link" />

                <IconsSelect
                value={values.icon}
                onChange={handleChange} />

                <Editor
                value={values.info}
                onChange={handleChange}
                name="info" />

                <button type="submit">
                    הוספה
                </button>
            </form>
        </Modal>
        
    )
}

export default AddItemForm
