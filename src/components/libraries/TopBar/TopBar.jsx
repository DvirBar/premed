import React, { useEffect, useState } from 'react'
import { useLocation, useRouteMatch } from 'react-router'
import LibraryMenu from './LibraryMenu/LibraryMenu'
import PathLinks from './PathLinks'

function TopBar() {
    
    return (
        <div className="top-bar">
            <PathLinks />
            <LibraryMenu />
        </div>
    )
}

export default TopBar
