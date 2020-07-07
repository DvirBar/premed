import React, { useState, useEffect } from 'react';
import { login } from '../../redux/actions/auth';
import { useSelector } from 'react-redux';
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
    }, [values])

    const selectedMsg = useSelector(state => state.messages);

    const [message, setMessage] = useState({});

    useEffect(() => {
        setMessage({
            msg: selectedMsg.msg, 
            status: selectedMsg.status
        });
    }, [selectedMsg])

    return (
        <form onSubmit={handleSubmit} noValidate>

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
            onChange={handleChange}
            /><br />
            <p className="form-error">
                {errors.password && errors.password}
            </p>

            <button 
            type="submit"
            disabled={disabled}>התחברות</button>
        </form>
    )
}

export default Login;