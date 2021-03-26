import React from 'react'
import ContentEditable from 'react-contenteditable'
import useFocus from './useFocus'

function EditableTextBox({ 
    value, 
    onChange, 
    placeholder, 
    options }) {
        
    const keyOptionsMap = event => {
        if(event) {
            switch(event.key) {
                case 'Enter': 
                    if(event.shiftKey) {
                        return;
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
            onChange(pastedText)
        }
    }
    const editableClassName = "editable-textbox" 
    useFocus(editableClassName)
    
    return (
        <ContentEditable
        id={editableClassName}
        html={value}
        onPaste={handlePaste}
        onChange={e => onChange(e.target.value)}
        onKeyPress={keyOptionsMap}
        placeholder={placeholder} />
    )
}

export default EditableTextBox
