import React, { Fragment, useState } from 'react'
import { useSelector } from 'react-redux'
import { unisSelector } from '../../../redux/selectors/unis'
import TabContent from '../../layout/tab-content/TabContent'

function UniContent({ content }) {
    const unis = useSelector(unisSelector)

    const findUni = uniId => {
        return unis.find(uni => uni._id === uniId)
    }

    const contentArr = Object.keys(content)
    .map(key => {
        const uni = findUni(key)

        return {
            id: key,
            tab: uni?.name,
            content: <div 
            dangerouslySetInnerHTML={{__html: content[key]}}>
            </div>,
            color: uni?.color
        }
    })

    const [selItem, setSelItem] = useState(contentArr[0])

    const selectItem = item => {
        setSelItem(item)
    }

    return (
        <TabContent
        selectItem={selectItem}
        selItem={selItem}
        items={contentArr} />
    )
}

export default UniContent
