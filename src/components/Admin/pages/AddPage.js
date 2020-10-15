import React, { Fragment, useEffect, useState } from 'react';
import useForm from '../../../forms/useForm';
import { addPage } from '../../../redux/actions/pages';
import Modal from '../../layout/Modal';
import FormInput from '../../common/FormInput';
import Checkbox from '../../common/Checkbox';

function AddPage({ paths }) {
    const [defaultValues, setDefaultValues] = useState({
        name: '',
        url: '',
        pathIds: []
    })

    const {
        handleChange,
        handleSubmit,
        values,
        errors
    } = useForm(addPage, defaultValues)

    const [displayModal, setDisplayModal] = useState(false)

    const toggleModal = toggle => {
        setDisplayModal(toggle)
    }   
    

    return (
        <Fragment>
            <button 
            onClick={() => toggleModal(true)}>
                עמוד חדש
            </button>
            <Modal 
            display={displayModal}
            toggleModal={toggleModal}
            title="עמוד חדש">
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

                    {paths.map(path => 
                        <Checkbox
                        name="pathIds"
                        label={path.name}
                        value={path._id}
                        onChange={handleChange}
                        checked={values?.pathIds?.find(pathId => 
                            pathId === path._id) ? true : false}
                        isMulti={true} />
                    )}

                    <button type="submit">יצירה</button>
                </form>
            </Modal>
        </Fragment>
    )
}

export default AddPage
