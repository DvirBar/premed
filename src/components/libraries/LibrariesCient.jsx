import React from 'react'
import Libraries from './Libraries'
import LibraryProvider from './LibraryContext'

function LibrariesCient() {
    return (
        <LibraryProvider isAdmin={false}>
            <Libraries />
        </LibraryProvider>
    )
}

export default LibrariesCient
