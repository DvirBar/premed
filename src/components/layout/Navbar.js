import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function Navbar() {
    const auth = useSelector(state => state.auth);
    
    return (
        <nav className='navbar'>
            <span className='logo'>Logo</span>
            <ul className='links'>
                <li>תהליך קבלה</li>
                <li>פסיכומטרי ובגרויות</li>
                <li>מיונים אישיותיים</li>
                <li>נתונים</li>
            </ul>
            <span className='left-section'>
                <input type='search' className='main-search' />
                {auth.isAuthenticated
                    ? <span className='private-sec'><Link to="/profile">איזור אישי</Link></span>
                    : <button>התחבר</button>}
            </span>
        </nav>
    )
}

export default Navbar;
