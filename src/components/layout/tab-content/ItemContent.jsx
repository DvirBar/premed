import React from 'react'

function ItemContent({ item, editor }) {
    const contentStyle = {
        borderColor: item?.color
    }

    return (
        <div 
        style={contentStyle}
        className="tab-item-content">
            {editor || item.content}
        </div>
    )
}

export default ItemContent
