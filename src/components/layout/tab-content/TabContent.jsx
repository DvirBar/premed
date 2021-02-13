import React, { useState } from 'react'
import ItemContent from './ItemContent'
import TabsList from './TabsList'

function TabContent({ selItem, selectItem, items, editor }) { 
    return (
        <div className="tab-content">
            <TabsList 
            selItem={selItem}
            selectItem={selectItem}
            items={items} /> 
            <ItemContent
            item={selItem}
            editor={editor} />
        </div>
    )
}



export default TabContent
