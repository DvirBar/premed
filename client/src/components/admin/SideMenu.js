import React from 'react'
import { useSelector } from 'react-redux';
import { Link, useRouteMatch, useLocation } from 'react-router-dom'
import { getAllPaths } from '../../redux/selectors/paths';

function SideMenu() {
    const { path } = useRouteMatch();
    let { pathname } = useLocation();
    const pathItems = useSelector(getAllPaths)

    const linksList = [
        {
            url: path,
            name: 'כללי'
        },
        {
            url: `${path}/announcements`,
            name: 'פרסומים' 
        },
        {
            url: `${path}/steps`,
            name: 'תהליך הקבלה' 
        },
        {
            url: `${path}/libraries/${pathItems[0]?._id}`,
            name: 'ספרייה' 
        },
        {
            url: `${path}/stats`,
            name: 'סטטיסטיקות' 
        },
        {
            url: `${path}/questions/${pathItems[0]?._id}`,
            name: 'שאלות נפוצות'
        },
        {
            url: `${path}/users`,
            name: 'משתמשים'
        }
    ]

    return (
        <div className="side-menu-admin scrollbar-main">
            <ul className="side-menu-admin__content">
                {linksList.map(link =>
                    <li
                    key={link.url} 
                    className={link.url === pathname
                    ? "side-menu-admin__content__item current"
                    : "side-menu-admin__content__item"}>
                        <Link to={link.url}>
                            <span>{link.name}</span>
                        </Link>
                    </li>)}
            </ul>
        </div>
    )
}

export default SideMenu
