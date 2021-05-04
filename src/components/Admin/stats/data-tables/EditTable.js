import React, { useEffect, useState } from 'react';
import useForm from '../../../../forms/useForm';
import { editTable } from '../../../../redux/actions/datatables';
import FormInput from '../../../common/FormInput';

function EditTable({ table }) {
    const [defaultValues, setDefaultValues] = useState({});

    useEffect(() => {
        setDefaultValues({
            ...table
        })
    }, [table])

    const {
        handleChange,
        handleSubmit,
        values,
        errors
    } = useForm(editTable, defaultValues, table._id)

    return (
        <form onSubmit={handleSubmit} noValidate>
            <FormInput
            label="שם"
            type="text"
            name="name"
            value={values.name}
            onChange={handleChange}
            error={errors.name} />

            <div className="url-details">     
                <input 
                type="text" 
                className="form-default"
                name="tableUrl"
                onChange={handleChange}
                value={values.tableUrl}
                placeholder="כתובת" />

                {values.tableUrl &&
                    <a 
                    href={values.tableUrl} 
                    target="_blank"
                    rel="noopener noreferrer">בדיקת קישור</a>
                }               
            </div>
            

            <FormInput
            label="שנה"
            type="text"
            name="year"
            value={values.year}
            onChange={handleChange}
            error={errors.year} />

            <button type="submit">עריכה</button>
        </form>
    )
}

export default EditTable
