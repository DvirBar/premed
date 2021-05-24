import React from 'react'

function ItemContent({ item }) {

    const contentStyle = {
        borderColor: item?.color
    }
    
    return (
        <div 
        style={contentStyle}
        className="tab-item-content ck-editor">
            {item.content}
        </div>
    )
}

export default ItemContent
