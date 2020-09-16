import React from 'react'

function SubpageLinks({ links, display }) {
    return (
        <ul className={display 
            ? "subpage-links-list open"
            : "subpage-links-list"
            }>
            <li className="list-header">
                קישורים שימושיים
            </li>
            {links?.length !== 0 
            ?   links?.map(link => 
                <li className="link-item">
                    <a 
                    href={link.url} 
                    target="_blank"
                    href={link.url}>
                        {link.name}
                    </a>
                </li>
                )
            :   <li>אין קישורים</li>
            }
        </ul>
    )
}

export default SubpageLinks
