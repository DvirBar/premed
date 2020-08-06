import React from 'react'
import { Link, useRouteMatch } from 'react-router-dom'

function SideMenu() {
    const { path } = useRouteMatch();

    return (
        <ul className="side-menu">
            <Link to={`${path}`}><li>כללי</li></Link>
            <Link to={`${path}/anouncements`}><li>פרסומים</li></Link>
            <Link to={`${path}/steps`}><li>תהליך הקבלה</li></Link>
            <li>קוגנטיבי</li>
            <li>אישיותי</li>
            <li>סטטיסטיקות </li>
            <li>הגדרות ומשתמשים</li>
            <li>פניות</li>
            <li>אבטחה</li>
        </ul>
    )
}

export default SideMenu
