import React, { useEffect, useState } from 'react';
import useForm from '../../../../../forms/useForm';
import { addThreshold } from '../../../../../redux/actions/datatables';
import DatePicker from '../../../../common/DatePicker';
import FormInput from '../../../../common/FormInput';
import Checkbox from '../../../../common/Checkbox';

function AddThreshold({ selField, tableId, threshType }) {
    const [defaultValues, setDefaultValues] = useState({
        date: new Date(),
        isFinal: false,
        isInitial: false,
        value: ''
    })

    useEffect(() => {
        setDefaultValues({
            ...defaultValues,
            fieldId: selField,
            threshType
        })
    }, [selField, threshType])

    const {
        handleChange,
        handleSubmit,
        values,
        errors,
    } = useForm(addThreshold, defaultValues, tableId)
    
    return (
        <form className="threshold-form" onSubmit={handleSubmit}>
            <FormInput 
            label="ערך"
            type="text"
            name="value"
            width='10rem'
            onChange={handleChange}
            value={values.value}
            error={errors.value} />

            <DatePicker
            label="תאריך"
            name="date"
            value={values.date}
            onChange={handleChange} />
            
            <Checkbox
            name="isInitial"
            label="ראשוני"
            onChange={handleChange}
            checked={values.isInitial} />

            <Checkbox
            name="isFinal"
            label="סופי"
            onChange={handleChange}
            checked={values.isFinal} />

            <button type="sumbit">
                הוספה
            </button>
        </form>
    )
}

export default AddThreshold
