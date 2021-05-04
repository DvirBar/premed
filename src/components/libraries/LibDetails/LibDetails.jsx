import React, { useContext } from 'react'
import { useSelector } from 'react-redux'
import { getLibChildren } from '../../../redux/libraries/selectors'
import Loadbar from '../../layout/Loadbar'
import { LibraryContext } from '../LibraryContext'
import LibsList from '../LibsList/LibsList'
import LibInfo from './LibInfo'
import LibItemsList from './LibItems/LibItemsList'
import DeleteLibrary from '../../admin/libraries/DeleteLibrary/DeleteLibrary'
import EditName from '../../admin/libraries/EditLibrary/EditName'
import AddLibrary from '../../admin/libraries/AddLibrary/AddLibrary'
import AddItem from '../../admin/libraries/Items/AddItem/AddItem'

function LibDetails({ lib }) {
    const libChildren = useSelector(getLibChildren(lib?._id))

    const hasItems = lib?.items.length > 0

    const {isAdmin} = useContext(LibraryContext)

    if(!lib) {
        return <Loadbar />
    }

    else {
        return (
            <div className="lib-details">
                {isAdmin &&
                    <EditName lib={lib} />
                }

                <div className="lib-details__options">
                    {lib.info &&
                        <LibInfo lib={lib} />
                    }

                    {isAdmin &&
                        <DeleteLibrary
                        libId={lib._id} />
                    }
                </div>

                {isAdmin &&
                    <div className="admin-options">
                        <AddLibrary parent={lib} />
                        <AddItem libId={lib._id} />
                    </div>
                }
                    
                {libChildren.length > 0 &&
                    <LibsList 
                    noItems={!hasItems}
                    libs={libChildren} />
 
                }
               
               {hasItems 
                ?   <LibItemsList
                    libId={lib._id}
                    items={lib.items} />

                :   <div className="no-resource-error">
                        לא נמצאו קבצים
                    </div>
                }
            </div>
        )
    }
}

export default LibDetails
