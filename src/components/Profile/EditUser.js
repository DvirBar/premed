import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { editUser } from '../../redux/actions/auth';
import useForm from '../../forms/useForm';
import FormInput from '../common/FormInput';


function EditUser({ user }) {
    const [defaultValues, setDefaultValues] = useState({})

    useEffect(() => {
        setDefaultValues({
            email: user.email
        })
    }, [user])

    const {
        handleChange,
        handleSubmit,
        values,
        errors
    } = useForm(editUser, defaultValues)

    useEffect(() => {
        console.log(values);
    }, [values])
    
    return (
        <form onSubmit={handleSubmit} noValidate>
            <FormInput
            label='דואר אלקטרוני'
            type='text'
            name='email'
            value={values.email}
            onChange={handleChange}
            error={errors.email}
            />

            <button type="submit">
                עדכון
            </button>
        </form>
    )
}

EditUser.propTypes = {
    user: PropTypes.object.isRequired
}

export default EditUser
