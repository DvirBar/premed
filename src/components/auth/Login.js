import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import { login } from '../../redux/actions/auth';
import useForm from '../../forms/useForm';
import FormInput from '../common/FormInput';

const Login = () => {
    const [defaultValues, setDefaultValues] = useState({
        email: '',
        password: ''
    });

    const {
        handleChange,
        handleSubmit,
        values,
        errors} = useForm(login, defaultValues);

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

    return (
        <form onSubmit={handleSubmit} noValidate>
            {auth.loading && <p>Loading...</p>}

            <h1>התחברות</h1>

            {message.msg &&
            <p className="form-error">{message.msg}</p>}

            <FormInput
            type="email"
            label="דואר אלקטרוני" 
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

            <button type="submit">התחברות</button><br />

            <p>עדיין אין משתמש? <Link to="/register">הירשם</Link></p>
        </form>
    )
}

Login.propTypes = {
    title: PropTypes.string
}

export default Login;