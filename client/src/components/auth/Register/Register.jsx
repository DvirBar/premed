import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Redirect, useLocation } from 'react-router-dom';
import useForm from '../../../forms/useForm';
import { register } from '../../../redux/actions/auth';
import { REGISTER } from '../../../redux/auth/types';
import { isLoading } from '../../../redux/loader/selectors';
import FormInput from '../../common/FormInput';
import Loadbar from '../../layout/Loadbar';

const Register = () => {
    const [defaultValues] = useState({
        firstName: '',
        lastName: '',
        username: '',
        isStudent: false,
        email: '',
        newPassword: ''
    });

    const {
        handleSubmit,
        handleChange,
        values,
        errors } = useForm(register, defaultValues);

    const auth = useSelector(state => state.auth);

    const loading = useSelector(isLoading(REGISTER))
    const location = useLocation()

    const handlePasswordChange = event => {
        if(event.target.value.length <= 64) {
            handleChange(event)
        }
    }

    if(auth.isAuthenticated) {
        if(location.state?.referrer) {
            return <Redirect to={location.state?.referrer} />
        }

        return <Redirect to="/" />;
    }

    else {
        return (
            <div className="register-page">
                <div className="register-container">
                    <form className="register-form" onSubmit={handleSubmit} noValidate>
                        {auth.loading && <p>Loading...</p>}
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

                        <FormInput
                        type="text"
                        label="שם משתמש"
                        name="username"
                        value={values.username}
                        onChange={handleChange}
                        error={errors.username}
                        limit='20'/>
                        
                        <FormInput
                        type="email"
                        label='דואר אלקטרוני' 
                        name="email"
                        value={values.email}
                        onChange={handleChange}
                        error={errors.email} />

                        <FormInput
                        type="password"
                        label="סיסמה"
                        name="newPassword"
                        value={values.newPassword}
                        onChange={handlePasswordChange}
                        error={errors.newPassword} />
                        
                        <div className="register-block">
                            <button type="submit">הרשמה</button>
                            {loading && <Loadbar small={true} />}
                        </div>
                    </form>
                </div>
            </div>
        )
    }
} 

export default Register;