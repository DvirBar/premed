import React, { Fragment } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router'
import { getLibById, getLibChildren } from '../../../redux/libraries/selectors'
import Loadbar from '../../layout/Loadbar'
import LibsList from '../LibsList/LibsList'
import LibItemsList from './LibItems/LibItemsList'

function LibDetails({ libId }) {
    const lib = useSelector(getLibById(libId))
    const libChildren = useSelector(getLibChildren(libId))
    
    if(!lib) {
        return <Loadbar />
    }

    else {
        return (
            <div className="lib-details">
               <div className="lib-name">
                   {lib.name}
               </div>
               
               {libChildren.length > 0 &&
                    // Recursion base case
                   <LibsList libs={libChildren} />
                
               }
               {lib.items.length > 0 &&
                    <LibItemsList />
                }
            </div>
        )
    }
}

export default LibDetails
