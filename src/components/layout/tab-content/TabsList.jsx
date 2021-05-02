import React from 'react'

function TabsList({
    selItem,
    selectItem,
    items
}) {

    const getStyle = color => {
        return {
            backgroundColor: color
        }
    }

    return (
        <div className="tabs-list noselect">
            {items.map(item => 
                <div 
                onClick={() => selectItem(item)}
                style={getStyle(item.color)}
                className={`tab-item
                ${selItem?.id === item.id ? 'selected' : ''}`}>
                    <span>
                        {item.tab}
                    </span>
                </div>
            )}
        </div>
    )
}

export default TabsList
