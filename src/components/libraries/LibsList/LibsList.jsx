import React, { Fragment, useContext } from 'react'
import AddLibrary from '../../admin/libraries/AddLibrary/AddLibrary'
import AddItem from '../../admin/libraries/Items/AddItem/AddItem'
import Grid from '../../layout/Grid/Grid'
import { LibraryContext } from '../LibraryContext'
import LibItem from './LibCardItem/LibCardItem'

function LibsList({ parent, libs, noItems }) {
    const {isAdmin} = useContext(LibraryContext)

    const ListContent =  libs.map(lib =>
        <LibItem
        key={lib._id}
        lib={lib}
        noItems={noItems} />
    )

    return (
        <div className="libs-list-wrapper">
            {isAdmin &&
                <div className="admin-options">
                    <AddLibrary parent={parent} />
                    
                    {parent &&
                        <AddItem libId={parent._id} />
                    }
                </div>
            }

            {libs.length > 0 &&
                <Fragment>
                    {noItems 
                    ? <Grid>
                         {ListContent}
                       </Grid>
                    : <div className="libs-list-has-items">
                        {ListContent}
                    </div>
                    }
                </Fragment>
                    
            }
        </div>
    )
}

export default LibsList
