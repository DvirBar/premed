import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import { login } from '../../../redux/actions/auth';
import useForm from '../../../forms/useForm';
import FormInput from '../../common/FormInput';

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
    
    if(auth.isAuthenticated)
        return <Redirect to="/" />;

    return (
        <div className="login-page">
            <div className="login-container">
                <form 
                className="login-form"
                onSubmit={handleSubmit} noValidate>
                    {auth.loading && <p>Loading...</p>}

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

                    <p>
                        עדיין אין משתמש?&nbsp; 
                        <Link 
                        className="no-user-register-link"
                        to="/register">
                            להרשמה
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    )
}

Login.propTypes = {
    title: PropTypes.string
}

export default Login;