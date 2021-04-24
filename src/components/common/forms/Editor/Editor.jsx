import React from 'react'
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

function Editor({ value, onChange, name }) {

    const handleChange = data => {
        onChange({
            name,
            value: data
        })
    }

    return (
        <CKEditor
        editor={ ClassicEditor }
        config={{
            language: {
                ui: 'he',
                content: 'he'
            }
        }}
        data={value}
        onBlur={ (event, editor) => {
            handleChange(editor.getData())
        }} />
    )
}

export default Editor
