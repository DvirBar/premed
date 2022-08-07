import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import useForm from '../../../forms/useForm';
import { requestForgotPasswordEmail } from '../../../redux/actions/auth';
import { REQUEST_FORGOT_PASSWORD } from '../../../redux/auth/types';
import { isLoading } from '../../../redux/loader/selectors';
import FormInput from '../../common/FormInput';
import Loadbar from '../../layout/Loadbar';

function SendFPEmailForm() {
    const [defaultValues] = useState({
        email: '',
    });

    const {
        handleChange,
        handleSubmit,
        values,
        errors} = useForm(requestForgotPasswordEmail, defaultValues);

    const loading = useSelector(isLoading(REQUEST_FORGOT_PASSWORD))
    
  return (
    <form onSubmit={handleSubmit} noValidate>
        <FormInput
        type="email"
        label="דואר אלקטרוני" 
        name="email"
        value={values.email}
        onChange={handleChange}
        error={errors.email} />

        <button type="submit">התחברות</button>
        {loading &&
            <Loadbar small={true} />
        }
    </form>
  )
}

export default SendFPEmailForm;
