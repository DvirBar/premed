import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { editUser } from '../../redux/actions/auth';
import useForm from '../../forms/useForm';
import FormInput from '../common/FormInput';
import Checkbox from '../common/Checkbox';


function EditUser({ user }) {
    const [defaultValues, setDefaultValues] = useState({})
    const reqPending = user?.isStudent?.isPending

    useEffect(() => {
        setDefaultValues({
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            username: user.username,
            isStudent: user?.isStudent?.status
        })
    }, [user])

    const {
        handleChange,
        handleSubmit,
        values,
        errors
    } = useForm(editUser, defaultValues)

    return (
        <form onSubmit={handleSubmit} noValidate>
            <div className="name-block">
                <FormInput
                type="text"
                label="שם"
                name="firstName"
                value={values.firstName}
                onChange={handleChange}
                error={errors.firstName}
                limit='20' />

                <FormInput
                type="text"
                label="שם משפחה"
                name="lastName"
                value={values.lastName}
                onChange={handleChange}
                error={errors.lastName}
                limit='20'/>
            </div>
        
            <FormInput
            type="text"
            label="שם משתמש"
            name="username"
            value={values.username}
            onChange={handleChange}
            error={errors.username}
            limit='20'/>
            
            <FormInput
            label='דואר אלקטרוני'
            type='text'
            name='email'
            value={values.email}
            onChange={handleChange}
            error={errors.email}
            />

            <div className="is-student-block">
                <Checkbox
                name="isStudent"
                label="אני סטודנט/ית"
                onChange={handleChange}
                checked={values.isStudent}
                disabled={reqPending} />

                {reqPending &&
                    <span className="student-approval-pending">
                        ממתין לאישור
                    </span>
                }
            </div>
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
