import React, { useEffect, useState } from 'react'
import useForm from '../../../forms/useForm';
import { editPage } from '../../../redux/actions/pages';
import FormInput from '../../common/FormInput';

function EditPage({ page }) {
    const [defaultValues, setDefaultValues] = useState({
        name: page.name,
        url: page.url
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
        <form onSubmit={handleSubmit} noValidate>
            <FormInput
            label={"שם"}
            type={"text"}
            name={"name"}
            value={values.name}
            onChange={handleChange}
            error={errors.name} />

            <FormInput
            label={"כתובת"}
            type={"text"}
            name={"url"}
            value={values.url}
            onChange={handleChange}
            error={errors.url} />

            <button type="submit">צור</button>
        </form>
    )
}

export default EditPage
