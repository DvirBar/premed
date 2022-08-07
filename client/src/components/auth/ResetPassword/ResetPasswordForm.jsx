import { useForkRef } from '@material-ui/core';
import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { Redirect, useLocation, useParams } from 'react-router-dom';
import useForm from '../../../forms/useForm';
import { resetPassword } from '../../../redux/actions/auth';
import { RESET_PASSWORD } from '../../../redux/auth/types';
import { isLoading } from '../../../redux/loader/selectors';
import { authSelector } from '../../../redux/selectors/auth';
import FormInput from '../../common/FormInput';
import Loadbar from '../../layout/Loadbar';

function ResetPasswordForm() {
    const {
        token,
    } = useParams();

    const [defaultValues] = useState({
        newPassword: ''
    });

    console.log(defaultValues);

    const {
        handleChange,
        handleSubmit,
        values,
        errors} = useForm(resetPassword, defaultValues, token);

    const auth = useSelector(authSelector);
    const loading = useSelector(isLoading(RESET_PASSWORD))

    const location = useLocation()
        
    const handlePasswordChange = event => {
        if(!event.target.value || event.target.value.length <= 64) {
            handleChange(event)
        }
    }

    if(auth.isAuthenticated) {
        if(location.state?.referrer) {
            return <Redirect to={location.state?.referrer} />
        }

        return <Redirect to="/" />;
    }

    return (
        <div className="login-page">
            <div className="login-container">
                <form 
                className="login-form"
                onSubmit={handleSubmit} noValidate>
                    <FormInput
                    type="password"
                    label="סיסמה"
                    name="newPassword"
                    value={values.newPassword}
                    onChange={handlePasswordChange}
                    error={errors.newPassword} />

                    <div className="login-block">
                        <button type="submit">איפוס</button>
                        {loading &&
                            <Loadbar small={true} />
                        }
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ResetPasswordForm