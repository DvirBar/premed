import React, { useEffect, useState } from 'react';
import useForm from '../../../../forms/useForm';
import { editTable } from '../../../../redux/actions/datatables';
import FormInput from '../../../common/FormInput';

function EditTable({ table }) {
    const [defaultValues, setDefaultValues] = useState({});

    useEffect(() => {
        setDefaultValues({
            name: table.name,
            tableUrl: table.url
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
            


            <button type="submit">עריכה</button>
        </form>
    )
}

export default EditTable
