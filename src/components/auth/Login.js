import React, { useState, useEffect } from 'react';
import { login } from '../../redux/actions/auth';
import useForm from '../../forms/useForm';

const Login = () => {
    const {
        handleChange,
        handleSubmit,
        values,
        errors} = useForm(login);

    const [disabled, setDisabled] = useState(true)

    useEffect(() => {
        if(values.email && values.password)
            setDisabled(false)
    }, [values])

    return (
        <form onSubmit={handleSubmit} noValidate>
            <input 
            type="email" 
            name="email"
            placeholder='דוא"ל'
            className={errors.email ? 'red-border' : ''}
            value={values.email || ''}
            onChange={handleChange}
            /><br />
            <p>
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
            <p>
                {errors.password && errors.password}
            </p>

            <button 
            type="submit"
            disabled={disabled}>התחברות</button>
        </form>
    )
}

export default Login;