import React, { Fragment, useContext, useEffect, useState } from 'react'
import { Link, useLocation, useParams, useRouteMatch } from 'react-router-dom'
import BreadCrumbs from '../../../common/BreadCrumbs'
import breakUrl from '../../../routing/utils/breakUrl'
import buildNestedUrl from '../../../routing/utils/buildNestedUrl'
import LibraryMenuItem from './LibraryMenuItem'

function LibraryMenu() {
    // Url options
    const location = useLocation()
    const { url } = useRouteMatch()

    // Build url items
    const nestedLibIds = breakUrl(url, location.pathname)
    const nestedPaths = buildNestedUrl(nestedLibIds, 'libId')

    // Create children breadcrumbs array
    let pathItems = []
    if(nestedPaths.length > 0) {
        pathItems.push(
            <Link 
            key="main"
            to={url}>
                ראשי
            </Link>
        )
    }

    for(let path of nestedPaths) {
        pathItems.push(
            <LibraryMenuItem
            key={path.libId}
            libItem={path} />
        )
    }

    if(nestedPaths.length > 0) {
        return (
            <BreadCrumbs> 
                {pathItems}
            </BreadCrumbs>
        )    
    }

    else return <Fragment></Fragment>
}

export default LibraryMenu
