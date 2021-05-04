import React from 'react'
import { Link } from 'react-router-dom'
import Login from '../../../common/icons/Login/Login'

function LoginLink() {
    return (
        <Link className="login-link" to="/login">
            <Login 
            color="#486974"
            className="login-link__login-icon" />
            <span className="login-link__login-icon__label">
                התחברות
            </span>
        </Link>
    )
}

export default LoginLink
