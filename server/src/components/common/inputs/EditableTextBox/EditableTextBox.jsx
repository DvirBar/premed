import React, { useRef } from 'react'
import ContentEditable from 'react-contenteditable'
import useFocus from './useFocus'

function EditableTextBox({ 
    value, 
    onChange, 
    onEnter,
    placeholder, 
    options }) {
    const ref = useRef(value)

    const handleChange = text => {
        console.log(text);
        onChange(text)
        ref.current = text
    }

    const keyOptionsMap = event => {
        if(event) {
            if(event.key === 'Enter') {
                if(event.shiftKey) {
                    return;
                }

                if(onEnter) {
                    onEnter(ref.current)
                }

                event.preventDefault()
                return false;
            }
        }
    }

    // Escape style paste
    const handlePaste = event => {
        if(!options?.pasteStyle && event) {
            event.preventDefault()

            const pastedText = event.clipboardData.getData('text/plain')
            handleChange(pastedText)
        }
    }

    const editableClassName = "editable-textbox" 
    useFocus(editableClassName)
    
    return (
        <ContentEditable
        id={editableClassName}
        html={value}
        onPaste={handlePaste}
        onChange={e => handleChange(e.target.value)}
        onKeyPress={keyOptionsMap}
        placeholder={placeholder} />
    )
}

export default EditableTextBox
