import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import useForm from '../../forms/useForm';
import { register } from '../../redux/actions/auth';
import FormInput from '../common/FormInput';

const Register = () => {
    const [defaultValues, setDefaultValues] = useState({
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
            <form className="register-form" onSubmit={handleSubmit} noValidate>
                {auth.loading && <p>Loading...</p>}

                <h1>הרשמה</h1>

                {message.msg &&
                <p className="form-error">{message.msg}</p>}

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
    
                <button type="submit">הירשם</button>
            </form>
        )
    }
} 

export default Register;