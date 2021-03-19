import React from 'react'

function LibraryCardItem({ lib }) {
    const notItem = lib.items.length === 0

    return (
        <div className={`lib-item 
        ${notItem ? 'no-items' : ''}`}>
            <span className="lib-name">
                {lib.name}
            </span>
        </div>
    )
}

export default LibraryCardItem
