import React from 'react'
import { useSelector } from 'react-redux'
import { getUnisByPath } from '../../../redux/selectors/unis'
import Editor from '../../common/forms/Editor/Editor'
import TabContent from '../../layout/tab-content/TabContent'

function UniContent({ content, editMode, onEdit, pathId }) {

    const unis = useSelector(getUnisByPath(pathId))
    
    const findUni = uniId => {
        return unis.find(uni => uni._id === uniId)
    }

    const createUniItem = uni => {
        return {
            id: uni._id,
            tab: uni?.name,
            content: editMode
            ? <Editor
                value={content[uni._id] || ''}
                onChange={onEdit}
                name={uni._id} />
            : <div 
            dangerouslySetInnerHTML={{__html: content[uni._id]}}>
            </div>,
            color: uni?.color
        }
    }

    const contentArr = editMode 
    ? unis.map(uni => createUniItem(uni))
    : Object.keys(content)
    .map(key => {
        const uni = findUni(key)
        return createUniItem(uni)
    })

    return (
        <TabContent
        items={contentArr}
        onEdit={onEdit}
        editMode={editMode} />
    )
}

export default UniContent
