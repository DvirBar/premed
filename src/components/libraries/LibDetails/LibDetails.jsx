import React, { useContext, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useLocation, useRouteMatch } from 'react-router'
import { getLibById, getLibChildren } from '../../../redux/libraries/selectors'
import Loadbar from '../../layout/Loadbar'
import { LibraryContext } from '../LibraryContext'
import LibsList from '../LibsList/LibsList'
import LibItemsList from './LibItems/LibItemsList'

function LibDetails({ lib }) {
   const libChildren = useSelector(getLibChildren(lib?._id))
   
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
