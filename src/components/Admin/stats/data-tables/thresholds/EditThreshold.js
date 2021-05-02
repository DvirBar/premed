import React, { useEffect, useState } from 'react';
import useForm from '../../../../../forms/useForm';
import { editThreshold } from '../../../../../redux/actions/datatables';
import DatePicker from '../../../../common/DatePicker';
import FormInput from '../../../../common/FormInput';
import Checkbox from '../../../../common/Checkbox';

export default function EditThreshold({ tableId, thresh, toggleEdit }) {
    const [defaultValues, setDefaultValues] = useState({})

    useEffect(() => {
        setDefaultValues({
            date: new Date(thresh.date),
            fieldId: thresh.field,
            isFinal: thresh.isFinal,
            threshType: thresh.threshType,
            value: thresh.value
        })
    }, [thresh])

    const {
        handleChange,
        handleSubmit,
        values,
        errors,
    } = useForm(editThreshold, defaultValues, tableId, thresh._id)

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
            name="isFinal"
            label="סופי"
            onChange={handleChange}
            checked={values.isFinal} />

            <button type="sumbit">
                עריכה
            </button>

            {/* <i 
            className="material-icons close-red"
            onClick={() => leaveEdit()}>
                close
            </i> */}
        </form>
    )
}
