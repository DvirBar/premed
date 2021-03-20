import React, { useContext } from 'react'
import { useSelector } from 'react-redux'
import { getLibChildren } from '../../../redux/libraries/selectors'
import Loadbar from '../../layout/Loadbar'
import { LibraryContext } from '../LibraryContext'
import LibsList from '../LibsList/LibsList'
import LibInfo from './LibInfo'
import LibItemsList from './LibItems/LibItemsList'
import DeleteLibrary from '../../admin/libraries/DeleteLibrary/DeleteLibrary'

function LibDetails({ lib }) {
    const libChildren = useSelector(getLibChildren(lib?._id))

    const hasItems = lib?.items.length > 0

    const isAdmin = useContext(LibraryContext)

    if(!lib) {
        return <Loadbar />
    }

    else {
        return (
            <div className="lib-details">
                <div className="lib-details__options">
                    {lib.info &&
                        <LibInfo lib={lib} />
                    }
                    {isAdmin &&
                        <DeleteLibrary
                        libId={lib._id} />
                    }
                </div>
                

               {libChildren.length > 0 &&
                    // Recursion base case
                   <LibsList 
                   noItems={!hasItems}
                   libs={libChildren} />
                
               }
               {hasItems &&
                    <LibItemsList />
                }
            </div>
        )
    }
}

export default LibDetails
