import React from 'react'

function Navbar() {
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
                <span className='private-sec'>איזור אישי</span>
            </span>
        </nav>
    )
}

export default Navbar;
