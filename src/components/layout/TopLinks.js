import React, { useEffect, useState } from 'react';

function TopLinks({ linksList, selectLink }) {
    const [selected, setSelected] = useState('')

    useEffect(() => {
        if(linksList) {
            handleSelect(linksList[0].loc)
        }
    }, [])

    const handleSelect = loc => {
        setSelected(loc);
        selectLink(loc);
    }
    
    return (
        <ul className="top-links">
            {linksList.map(link => 
                <li
                key={link.loc} 
                className={link.loc === selected
                ? "link-item current"
                : "link-item"}
                onClick={() => handleSelect(link.loc)}>
                    <span>
                        <span className="span-hover">
                            {link.name}
                        </span>
                    </span>
                </li>
            )}
        </ul>
    )
}

export default TopLinks
