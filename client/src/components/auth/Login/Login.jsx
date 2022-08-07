import React, { useState } from 'react';
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux';
import { Redirect, Link, useHistory, useLocation } from 'react-router-dom';
import { login } from '../../../redux/actions/auth';
import useForm from '../../../forms/useForm';
import FormInput from '../../common/FormInput';
import { authSelector } from '../../../redux/selectors/auth';
import { isLoading } from '../../../redux/loader/selectors';
import { LOGIN } from '../../../redux/auth/types';
import Loadbar from '../../layout/Loadbar';
import SendFPEmail from '../ForgotPassword/SendFPEmail';

const Login = () => {
    const [defaultValues] = useState({
        email: '',
        password: ''
    });


    const [displayForgot, setDisplayForgot] = useState(false);

    const {
        handleChange,
        handleSubmit,
        values,
        errors} = useForm(login, defaultValues);

    const auth = useSelector(authSelector);
    const loading = useSelector(isLoading(LOGIN))

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
                    onChange={handlePasswordChange}
                    error={errors.password} />

                    <div 
                    className="forgot-password-link"
                    onClick={() => setDisplayForgot(true)}>שכחתי את הסיסמה</div>

                    <div className="login-block">
                        <button type="submit">התחברות</button>
                        {loading &&
                            <Loadbar small={true} />
                        }
                    </div>
                    

                    <p>
                        עדיין אין משתמש?&nbsp; 
                        <Link 
                        className="no-user-register-link"
                        to={{ 
                            ...location,
                            pathname: '/register'
                        }}>
                            להרשמה
                        </Link>
                    </p>
                </form>
            </div>
            <SendFPEmail 
            toggleModal={setDisplayForgot}
            display={displayForgot} />
        </div>
    )
}

Login.propTypes = {
    title: PropTypes.string
}

export default Login;