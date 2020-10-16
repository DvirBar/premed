import React, { useState, Fragment }from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../../redux/actions/auth';
import logo from '../../assets/logo.svg';

function Navbar({ paths }) {
    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth);
    const pages = useSelector(state => state.pages.pages)

    const [display, setDisplay] = useState(false);
    const [showMenu, setShowMenu] = useState(false);

    const openModal = () => {
        setDisplay(true);
    };

    const toggleMenu = () => {
        setShowMenu(!showMenu);
    };

    const showMenuStyle = {
        display: "flex"
    };

    const hideMenuStyle = {
    };

    const logoutUser = () => {
        dispatch(logout())
    }

    const [displayDriveLinks, setDisplayDriveLinks] = useState(false)

    return (
        <header>
            <i className="material-icons search-mobile">search</i>
            <Link to="/">
                <span className='logo'>
                    <img className="logo-color" src={logo} alt='Logo' />
                </span>
            </Link>
            <nav className='navbar'>
                <span className="menu-icons">
                    {!showMenu
                        ? <i 
                        className="material-icons menu"
                        onClick={() => toggleMenu()}
                        >menu</i>
                        
                        : <i className="material-icons close"
                        onClick={() => toggleMenu()}
                        >close</i>
                    }
                </span>
                <ul className='links' style={showMenu ? showMenuStyle : hideMenuStyle}>
                    <li>
                        <Link to={`/steps/${paths[0]._id}`}>
                            <span>תהליך הקבלה</span>
                        </Link>
                    </li>
                    <li className="drive-links">
                        <Link to={`/drive/${paths[0]._id}`}>
                            <span>דרייב</span>
                        </Link>
                    </li>
                    <li>
                        <Link to={`/stats/${paths[0]._id}`}>
                            <span>נתונים</span>
                        </Link>
                    </li>
                    <li>
                        <Link to='/qna/general'>
                            <span>שאלות נפוצות</span>
                        </Link>
                    </li>
                    <ul className="left-section">
                        <li className="search">
                            <i className="material-icons search">search</i>
                        </li>
                        {auth.isAuthenticated
                            ? (
                                <li className="user-links">
                                    <span>משתמש</span>
                                    <ul className="sub-menu">
                                        <li>
                                            <Link to="/profile"> 
                                                <i className="material-icons">person</i>
                                                <span>פרופיל</span>
                                            </Link>
                                        </li>
                                        {auth.user.isAdmin && 
                                            <li>
                                                <Link to="/admin">
                                                    <i className="material-icons">admin_panel_settings</i>
                                                    <span>ניהול</span>
                                                </Link>
                                            </li>
                                        }
                                        <li onClick={() => logoutUser()}>
                                            <i className="material-icons">power_settings_new</i>
                                            <span>התנתק</span>
                                        </li>
                                    </ul>
                                </li>
                            )
                            : (
                                <Link to="/login" id="login-link">התחבר</Link>
                            )}
                    </ul>
                </ul>
            </nav>
        </header>
    )
}

Navbar.propTypes = {
    paths: PropTypes.array.isRequired
}

export default Navbar;
