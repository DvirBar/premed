import React, { Fragment, useState }from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Modal from './Modal';
import Login from '../auth/Login';

function Navbar() {
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
                        <p>מיונים אישיותיים</p>
                        <ul className="sub-menu">
                            <li>מו"ר/מרק"ם</li>
                            <li>מיוני באר שבע</li>
                        </ul>
                    </li>
                    <li>נתונים</li>
                    <li className="left-section">
                        <i className="material-icons search">search</i>
                        {auth.isAuthenticated
                            ? (
                                <Fragment>
                                    <span className='private-sec'><Link to="/profile">א</Link></span>
                                    {auth.user.isAdmin && 
                                    <span className="admin-sec"><Link to="/admin">ב</Link></span>}
                                </Fragment>
                            )
                            : (
                                <Link to="/login" id="login-link">התחבר</Link>
                            )}
                    </li>
                </ul>
            </nav>
        </header>
    )
}

export default Navbar;
