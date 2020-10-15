import React, { useEffect, useState } from 'react'
import useForm from '../../../forms/useForm';
import { editPage } from '../../../redux/actions/pages';
import Modal from '../../layout/Modal';
import FormInput from '../../common/FormInput';

function EditPage({ page, display, toggleModal }) {
    const [defaultValues, setDefaultValues] = useState({
        name: page.name,
        url: page.url,
        pathIds: page.paths
    })

    const {
        handleChange,
        handleSubmit,
        values,
        errors
    } = useForm(editPage, defaultValues, page._id)
    
    useEffect(() => {
        console.log(values);
    }, [values])
    return (
        <Modal
        display={display}
        toggleModal={toggleModal}
        title="עריכת עמוד">
            <form onSubmit={handleSubmit} noValidate>
                <FormInput
                label="שם"
                type="text"
                name="name"
                value={values.name}
                onChange={handleChange}
                error={errors.name} />

                <FormInput
                label="כתובת"
                type="text"
                name="url"
                value={values.url}
                onChange={handleChange}
                error={errors.url} />

                <button type="submit">עריכה</button>
            </form>
        </Modal>
    )
}

export default EditPage
