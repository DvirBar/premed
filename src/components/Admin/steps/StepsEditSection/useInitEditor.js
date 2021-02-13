import React, { useEffect, useState } from 'react'
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import * as he from '@ckeditor/ckeditor5-build-classic/build/translations/he.js';

function useInitEditor(selItem, uniContent, changeContent) {
    const [editor, setEditor] = useState()

    useEffect(() => {
        if(selItem) {
            setEditor(<CKEditor
            editor={ ClassicEditor }
            config={{
                language: {
                    ui: 'he',
                    content: 'he'
                }
            }}
            data={uniContent && uniContent[selItem?.id]}
            onChange={ (event, editor) => {
                return changeContent(editor.getData())
            }} />)
        }
    })
   
    return editor
}

export default useInitEditor
