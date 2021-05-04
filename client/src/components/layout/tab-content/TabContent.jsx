import React, { useState } from 'react'
import ItemContent from './ItemContent'
import TabsList from './TabsList'

function TabContent({ items }) { 

    const [selItem, setSelItem] = useState(items[0])

    const selectItem = item => {
        setSelItem(item)
    }

    return (
        <div className="tab-content">
            <TabsList 
            selItem={selItem}
            selectItem={selectItem}
            items={items} /> 
            <ItemContent
            item={selItem} />
        </div>
    )
}



export default TabContent
