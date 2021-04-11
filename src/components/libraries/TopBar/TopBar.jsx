import React, { useContext, useEffect, useState } from 'react'
import { useLocation, useRouteMatch } from 'react-router'
import ContentContainer from '../../layout/ContentContainer/ContentContainer'
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
            <ContentContainer>
                <LibraryMenu />
            </ContentContainer>
            
        </div>
    )
}

export default TopBar
