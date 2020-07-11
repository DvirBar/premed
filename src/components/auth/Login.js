import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import { login } from '../../redux/actions/auth';
import useForm from '../../forms/useForm';

const Login = () => {
    const {
        handleChange,
        handleSubmit,
        values,
        errors} = useForm(login);

    const [disabled, setDisabled] = useState(true);

    useEffect(() => {
        if(values.email && values.password)
            setDisabled(false)
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

    return (
        <form onSubmit={handleSubmit} noValidate>
            {auth.loading && <p>Loading...</p>}

            <h1>התחברות</h1>

            {message.msg &&
            <p className="form-error">{message.msg}</p>}

            <input 
            type="email" 
            name="email"
            placeholder='דוא"ל'
            className={errors.email ? 'red-border' : ''}
            value={values.email || ''}
            onChange={handleChange}
            /><br />
            <p className="form-error">
                {errors.email && errors.email}
            </p>

            <input 
            type="password"
            name="password"
            placeholder="סיסמה"
            className={errors.password ? 'red-border' : ''}
            onChange={handleChange}
            value={values.password || ''}
            /><br />
            <p className="form-error">
                {errors.password && errors.password}
            </p>

            <button 
            type="submit"
            disabled={disabled}>התחברות</button><br />

            <p>עדיין אין משתמש? <Link to="/register">הירשם</Link></p>
        </form>
    )
}

export default Login;