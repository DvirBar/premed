import React, { useState, useEffect } from 'react';
import useForm from '../../forms/useForm';
import { addSection } from '../../redux/actions/sections';

function AddSection() {

    const [disabled, setDisabled] = useState(true)

    const {
        handleChange,
        handleSubmit,
        values,
        errors } = useForm(addSection);

    useEffect(() => {
        if(values)
            setDisabled(false)
    }, [values])

    return (
        <form onSubmit={handleSubmit} noValidate>
            {errors.name && <p className="form-error">{errors.name}</p>}
            <input 
            type="text"
            name="name"
            placeholder="שם המתחם"
            value={values.name || ''}
            onChange={handleChange}
            /><br /><br />

            <button 
            type="submit"
            disabled={disabled}
            >צור</button>
        </form>
    )
}

export default AddSection;
