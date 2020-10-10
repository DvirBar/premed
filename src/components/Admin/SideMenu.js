import React from 'react'
import { Link, useRouteMatch, useLocation } from 'react-router-dom'
import Pages from './pages/Pages';

function SideMenu() {
    const { path } = useRouteMatch();
    let { pathname } = useLocation();

    const linksList = [
        {
            url: path,
            name: 'כללי'
        },
        {
            url: `${path}/anouncements`,
            name: 'פרסומים' 
        },
        {
            url: `${path}/steps`,
            name: 'תהליך הקבלה' 
        },
        {
            url: `${path}/pages`,
            name: 'עמודים' 
        },
        {
            url: `${path}/stats`,
            name: 'סטטיסטיקות' 
        },
        {
            url: `${path}/questions`,
            name: 'שאלות נפוצות'
        }
        // {
        //     url: `${path}/anouncements`,
        //     name: 'פניות' 
        // },
        // {
        //     url: `${path}/anouncements`,
        //     name: 'הגדרות ומשתמשים' 
        // }
    ]

    return (
        <ul className="side-menu">
            {linksList.map(link =>
                <li
                key={link.url} 
                className={link.url === pathname
                ? "link-item current"
                : "link-item"}>
                    <Link to={link.url}>
                        <span>{link.name}</span>
                    </Link>
                </li>)}
        </ul>
    )
}

export default SideMenu
