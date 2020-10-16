import React from 'react'

function PageLinks({ links, display }) {
    return (
        <ul className={display 
            ? "page-links-list open"
            : "page-links-list"
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

export default PageLinks
