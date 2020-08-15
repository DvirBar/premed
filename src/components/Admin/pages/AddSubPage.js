import React, { useState } from 'react';
import PropTypes from 'prop-types';
import useForm from '../../../forms/useForm';
import { addSubpage } from '../../../redux/actions/pages';
import FormInput from '../../common/FormInput';

function AddSubPage({ pageId }) {
    const [defaultValues, setDefaultValues] = useState({
        name: '',
        url: ''
    })

    const {
        handleChange,
        handleSubmit,
        values,
        errors
    } = useForm(addSubpage, defaultValues, pageId)

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

AddSubPage.propTypes = {
    pageId: PropTypes.object.isRequired
}

export default AddSubPage
