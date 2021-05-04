import React from 'react'
import { Link } from 'react-router-dom';

function LogToDashboard() {
    return (
        <div>
            משתמשים מחוברים יכול להפיק הרבה יותר מהדאשבורד!
            <Link to="/login">התחבר </Link>
            או
            <Link to="/register">הירשם </Link>
        </div>
    )
}

export default LogToDashboard
