import React, { useState } from 'react';
import PropTypes from 'prop-types';
import useForm from '../../../forms/useForm';
import { editSubpage } from '../../../redux/actions/pages';
import FormInput from '../../common/FormInput';

function EditSubpage({ pageId, subpage }) {
    const [defaultValues, setDefaultValues] = useState({
        name: subpage.name,
        url: subpage.url
    })

    const {
        handleChange,
        handleSubmit,
        values,
        errors
    } = useForm(editSubpage, defaultValues, pageId, subpage._id)

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

EditSubpage.propTypes = {
    pageId: PropTypes.object.isRequired,
    subpage: PropTypes.object.isRequired
}

export default EditSubpage
