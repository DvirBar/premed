import React, { useState } from 'react';
import useForm from '../../../forms/useForm';
import { addPage } from '../../../redux/actions/pages';
import FormInput from '../../common/FormInput';

function AddPage() {
    const [defaultValues, setDefaultValues] = useState({
        name: '',
        url: ''
    })

    const {
        handleChange,
        handleSubmit,
        values,
        errors
    } = useForm(addPage, defaultValues)

    return (
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

            <button type="submit">יצירה</button>
        </form>
    )
}

export default AddPage
