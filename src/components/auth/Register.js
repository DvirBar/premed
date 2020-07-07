import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import useForm from '../../forms/useForm';
import { register } from '../../redux/actions/auth';

const Register = () => {
    const {
        handleSubmit,
        handleChange,
        values,
        errors } = useForm(register);

    const [disabled, setDisabled] = useState(true);

    useEffect(() => {
        if( values.email &&
            values.password)
            setDisabled(false);
    }, [values]);

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

                <input
                type="email"
                name="email"
                id="email"
                placeholder="אימייל"
                value={values.email || ''}
                className="form-field"
                onChange={handleChange}
                />
                <br />
                <p className="form-error">
                    {errors.email && errors.email}
                </p>
    
                <input
                type="password"
                name="password"
                placeholder="סיסמה"
                value={values.password || ''}
                className={errors.password ? 'red-border' : ''}
                onChange={handleChange}
                /><br />
                <p className="form-error">
                    {errors.password && errors.password}
                </p>
    
                <button 
                type="submit"
                disabled={disabled}
                >הירשם</button>
            </form>
        )
    }
} 

export default Register;