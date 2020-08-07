import React, { Fragment, useState }from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { logout } from '../../redux/actions/auth';

function Navbar() {
    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth);
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
                    <li>תהליך קבלה</li>
                    <li>
                        <span>פסיכומטרי ובגרויות</span>
                        <ul className="sub-menu">
                            <li>בגרויות</li>
                            <li>פסיכומטרי</li>
                        </ul>
                    </li>
                    <li>
                        <span>מיונים אישיותיים</span>
                        <ul className="sub-menu">
                            <li>מו"ר/מרק"ם</li>
                            <li>מיוני באר שבע</li>
                        </ul>
                    </li>
                    <li>נתונים</li>
                    <ul className="left-section">
                        <li className="search">
                            <i className="material-icons search">search</i>
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

export default Navbar;
