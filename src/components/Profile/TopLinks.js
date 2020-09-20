import React from 'react';
import { Link, useRouteMatch, useLocation } from 'react-router-dom';

function TopLinks() {
    let { path } = useRouteMatch();
    let { pathname } = useLocation();

    const linksList = [
        {
            url: path,
            name: 'פרטים והגדרות'
        },
        {
            url: `${path}/userdata`,
            name: 'נתונים'
        },
        {
            url: `${path}/suggestions`,
            name: 'הפניות שלי'
        }
    ]

    return (
        <ul className="top-links">
            {linksList.map(link => 
                 <li
                 key={link.url} 
                 className={link.url === pathname
                 ? "link-item current"
                 : "link-item"}>
                     <Link to={link.url}>
                         <span>
                             <span className="span-hover">
                                {link.name}
                             </span>
                         </span>
                     </Link>
                 </li>
            )}
        </ul>
    )
}

export default TopLinks
