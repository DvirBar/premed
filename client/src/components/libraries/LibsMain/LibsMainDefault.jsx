import React, { useContext } from 'react'
import AddLibrary from '../../admin/libraries/AddLibrary/AddLibrary'
import { LibraryContext } from '../LibraryContext'
import LibsList from '../LibsList/LibsList'

function LibsMainDefault({ libs }) {
    const {isAdmin} = useContext(LibraryContext)

    return (
        <div>
            {isAdmin &&
                <AddLibrary />
            }

            <LibsList 
            noItems={true}
            libs={libs} /> 
        </div>
    )
}

export default LibsMainDefault
