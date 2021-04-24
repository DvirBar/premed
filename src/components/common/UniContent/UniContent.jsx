import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { getUnisByPath } from '../../../redux/selectors/unis'
import TabContent from '../../layout/tab-content/TabContent'

function UniContent({ pathId, onEdit }) {
    const unis = useSelector(getUnisByPath(pathId))
    const contentArr = unis.map(uni => ({
        id: uni._id,
        tab: uni.name,
        color: uni.color
    }))
    
    const [selItem, setSelItem] = useState(contentArr[0])

    return (
        <TabContent 
        selItem={selItem}
        selectItem={setSelItem}
        items={contentArr}
        editMode={true}
        onEdit={onEdit} />
    )
}

export default UniContent
