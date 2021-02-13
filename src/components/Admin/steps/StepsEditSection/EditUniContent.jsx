import React, { useContext, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { getUnisByPath } from '../../../../redux/selectors/unis'
import TabContent from '../../../layout/tab-content/TabContent';
import { StepsContext } from '../../../steps/StepsContext';
import useInitEditor from './useInitEditor';

// import useInitEditor from './useInitEditor';

function EditUniContent({ uniContent, handleChange }) {
    const {
        pathId
    } = useContext(StepsContext)

    const unis = useSelector(getUnisByPath(pathId))

    const findUni = uniId => {
        return unis.find(uni => uni._id === uniId)
    }

    const contentArr = Object.keys(uniContent)
        .map(key => {
            const uni = findUni(key)

            return {
                id: key,
                tab: uni?.name,
                color: uni?.color
            }
    })

    const [selItem, setSelItem] = useState(contentArr[0])

    const selectItem = item => {
        setSelItem(item)
    }

    const changeContent = content => {
        if(selItem && selItem.id) {
            if(content !== uniContent[selItem.id]) {
                handleChange({
                    name: "uniContent",
                    value: {
                        ...uniContent,
                        [selItem.id]: content
                    }
                })
            }
        }
        
    }

    // Initialize editor 
    const editor = useInitEditor(
        selItem, 
        uniContent, 
        changeContent)
    
 
    return (
        <TabContent
        selectItem={selectItem}
        selItem={selItem}
        items={contentArr}
        editor={editor} />
    )
}

export default EditUniContent
