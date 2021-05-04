import React from 'react'
import { Link } from 'react-router-dom'

function SideBarItem({ link }) {
    const isUpcoming = link.isUpcoming

    return (
        <li 
        className="side-bar__links__item"
        key={link.url}>
            {link.isUpcoming
            ?   <div className={`side-bar__links__item__content 
                                ${isUpcoming ? 'upcoming' : ''}`}>
                    <div>{link.icon && link.icon({ outlined: false })}</div>
                    <div>{link.name}</div>
                    <div className="side-bar__links__item__content__upcoming-label">
                        בקרוב
                    </div>
                </div>
            :   link.external
                ?   <a
                    href={link.url} 
                    target="_blank"
                    rel="noopener noreferrer">
                        <div className="side-bar__links__item__content">
                            <div>{link.icon && link.icon({ outlined: false })}</div>
                            <div>{link.name}</div>
                        </div>
                    </a>

                :   <Link to={link.url}>
                        <div className="side-bar__links__item__content">
                            <div>{link.icon && link.icon({ outlined: false })}</div>
                            <div>{link.name}</div>
                        </div>
                    </Link>
            }
        </li>
    )
}

export default SideBarItem
