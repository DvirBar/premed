import React, { useState, useEffect } from 'react';
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
        if( values.username &&
            values.email &&
            values.password)
            setDisabled(false);
    }, [values])

    return (
        <form onSubmit={handleSubmit} noValidate>
            <input
            type="email"
            name="email"
            placeholder="Email"
            value={values.email || ''}
            className={errors.email ? 'red-border' : ''}
            onChange={handleChange}
            /><br />
            <p>
                {errors.email && errors.email}
            </p>

            <input
            type="password"
            name="password"
            placeholder="Password"
            value={values.password || ''}
            className={errors.password ? 'red-border' : ''}
            onChange={handleChange}
            /><br />
            <p>
                {errors.password && errors.password}
            </p>

            <button 
            type="submit"
            disabled={disabled}
            >Register</button>
        </form>
    )
} 

export default Register;