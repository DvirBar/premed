import React, { useContext } from 'react'
import AddLibrary from '../../admin/libraries/AddLibrary/AddLibrary'
import { LibraryContext } from '../LibraryContext'
import LibItem from './LibCardItem/LibCardItem'

function LibsList({ parent, libs, noItems }) {
    const {isAdmin} = useContext(LibraryContext)

    return (
        <div className="libs-list-wrapper">
            {isAdmin &&
                <AddLibrary parent={parent} />
            }

            {libs.length > 0 &&
                <div className={`libs-list 
                ${noItems ? 'no-items' : 'has-item'}`}>
                    {libs.map(lib =>
                        <LibItem
                        key={lib._id}
                        lib={lib}
                        noItems={noItems} />
                    )}
                </div>   
            }
        </div>
    )
}

export default LibsList
