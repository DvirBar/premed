import React, { useContext, useEffect, useState } from 'react'
import { useLocation, useRouteMatch } from 'react-router'
import { LibraryContext } from '../LibraryContext'
import LibraryMenu from './LibraryMenu/LibraryMenu'
import PathLinks from './PathLinks'

function TopBar() {
    const {isAdmin} = useContext(LibraryContext)
    return (
        <div className="top-bar">
            {!isAdmin &&
                <PathLinks />            
            }
            <LibraryMenu />
        </div>
    )
}

export default TopBar
