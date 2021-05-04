import React from 'react'
import { Link, useLocation } from 'react-router-dom';
import getRoot from '../../../../routing/utils/getRoot';

function LinkItem({ link }) {
    const { pathname } = useLocation()
    const isCurrent = getRoot(pathname) === getRoot(link.url)
    return (
        <li className="link-item">
            <Link to={link.url}>
                <div 
                className={`link-item__wrapper ${isCurrent ? 'current' : ''}`}>
                    <div className="link-item__icon">
                        {link.icon({outlined: !isCurrent})}
                    </div>
                    <div className="link-item__name">
                        {link.name}
                    </div>
                </div>
            </Link>
        </li>
    )
}

export default LinkItem
