import React, { useState, Fragment }from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../../redux/actions/auth';

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

    return (
        <header>
            <i className="material-icons search-mobile">search</i>
            <Link to="/"><span className='logo'>Logo</span></Link>
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
                        <span>
                            תהליך הקבלה
                        </span>
                        <ul className="sub-menu">
                            {paths?.map(path => (
                                <li key={path._id}>
                                    <Link to={`/steps/${path._id}`}>
                                        <span>{path.name}</span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </li>
                    <Fragment>
                        {pages && pages.length !== 0 &&
                            pages.map(page => (
                                <li key={page._id}>
                                    <span>
                                        {page.name}
                                    </span>
                                    <ul className="sub-menu">
                                    {page.subpages.map(subpage => (
                                        <li key={subpage._id}>
                                            <Link to={`/${page.url}/${subpage.url}`}>
                                                <span>{subpage.name}</span>
                                            </Link>
                                        </li>
                                    ))}
                                    </ul>
                                </li>
                            ))
                        }
                    </Fragment>
                    <li>
                        <span>
                           נתונים  
                        </span>
                    </li>
                    <ul className="left-section">
                        <li className="search">
                            <span>
                            <i className="material-icons search">search</i>
                            </span>
                          
                        </li>
                        {auth.isAuthenticated
                            ? (
                                <li className="user-links">
                                    <span>
                                        <i className="material-icons">account_circle</i>
                                        <span>משתמש</span>
                                    </span>
                                    <ul className="sub-menu">
                                        <Link to="/profile">
                                            <li>
                                                פרופיל
                                            </li>
                                        </Link>
                                        {auth.user.isAdmin && 
                                            <Link to="/admin">
                                                <li>
                                                    <i className="material-icons">admin_panel_settings</i>
                                                    <span>ניהול</span>
                                                </li>
                                            </Link>
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
