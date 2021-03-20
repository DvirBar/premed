import React, { useState } from 'react'
import useForm from '../../../../forms/useForm'
import { editLibrary } from '../../../../redux/libraries/actions'
import FormInput from '../../../common/FormInput'

function EditName({ lib }) {
    const [defaultValues, setDefaultValues] = useState({
        ...lib
    })

    const {
        handleChange,
        handleSubmit,
        values,
        errors
    } = useForm(editLibrary, defaultValues, lib._id)

    return (
        <form 
        className="edit-library-name"
        onSubmit={handleSubmit} 
        noValidate>
            <FormInput
            label="שם"
            type="text"
            name="name"
            value={values.name}
            onChange={handleChange}
            error={errors.name} />

            <button type="submit">
                שמירה
            </button>
        </form>
    )
}

export default EditName
