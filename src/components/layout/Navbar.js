import React, { Fragment, useState }from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Modal from './Modal';
import Login from '../auth/Login';

function Navbar() {
    const auth = useSelector(state => state.auth);
    const [display, setDisplay] = useState(false);

    const openModal = () => {
        setDisplay(true);
    }

    return (
        <nav className='navbar'>
            <span className='logo'>Logo</span>
            <ul className='links'>
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
            </ul>
            <span className='left-section'>
                <input type='search' className='main-search' />
                {auth.isAuthenticated
                    ? (
                        <Fragment>
                            <span className='private-sec'><Link to="/profile">איזור אישי</Link></span>
                            {auth.user.isAdmin && 
                            <span className="admin-sec"><Link to="/admin">איזור ניהול</Link></span>}
                        </Fragment>
                    )
                    : (
                        <Fragment>
                            <Link to="/login"><button>התחבר</button></Link>
                        </Fragment>
                    )}
            </span>
        </nav>
    )
}

export default Navbar;
