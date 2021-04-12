import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import useForm from '../../../forms/useForm';
import { register } from '../../../redux/actions/auth';
import FormInput from '../../common/FormInput';
import Checkbox from '../../common/Checkbox';

const Register = () => {
    const [defaultValues, setDefaultValues] = useState({
        firstName: '',
        lastName: '',
        username: '',
        isStudent: false,
        email: '',
        password: ''
    });

    const {
        handleSubmit,
        handleChange,
        values,
        errors } = useForm(register, defaultValues);

    const auth = useSelector(state => state.auth);
    
    const selectedMsg = useSelector(state => state.messages);
    const [message, setMessage] = useState({});

    useEffect(() => {
        setMessage({
            msg: selectedMsg.msg, 
            status: selectedMsg.status
        });
    }, [selectedMsg])


    if(auth.isAuthenticated)
        return <Redirect to="/" />;

    else {
        return (
            <div className="register-page">
                <div className="register-container">
                    <form className="register-form" onSubmit={handleSubmit} noValidate>
                        {auth.loading && <p>Loading...</p>}

                        {message.msg &&
                        <p className="form-error">{message.msg}</p>}

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
                        type="email"
                        label='דואר אלקטרוני' 
                        name="email"
                        value={values.email}
                        onChange={handleChange}
                        error={errors.email} />

                        <FormInput
                        type="password"
                        label="סיסמה"
                        name="password"
                        value={values.password}
                        onChange={handleChange}
                        error={errors.password} />
            
                        <button type="submit">הרשמה</button>
                    </form>
                </div>
            </div>
        )
    }
} 

export default Register;