import React from 'react'
import { 
    generatePath,
    useRouteMatch } from 'react-router-dom'
import TopLinksWrapper from '../../layout/TopLinksWrapper'
import PathsChoose from './PathsChoose'
import SelectTable from './SelectTable'
import TypeChoose from './TypeChoose'

function Topbar() {
    const { path, params } = useRouteMatch()
    const { tableId, pathId, type } = params

    const newPath = (pathId, tableId, type) => {
        return generatePath(path, {
            pathId,
            tableId,
            type
        })
    }
    
    // const match = matchPath(location.pathname, {
    //     path: `${path}/:pathId/:tableId/:type`,
    //     exact: true,
    //     strict: false
    //   });
    // let selPath, selTable

    // if(match && match.params) {
    //     selPath = match.params.pathId
    //     selTable = match.params.tableId 
    // }


    return (
        <TopLinksWrapper>
            <PathsChoose 
            pathId={pathId}
            tableId={tableId}
            type={type}
            newPath={newPath} />
            <SelectTable
            pathId={pathId}
            tableId={tableId}
            type={type}
            newPath={newPath} />
            <TypeChoose 
            pathId={pathId}
            tableId={tableId}
            type={type}
            newPath={newPath} />
        </TopLinksWrapper>
    )
}

export default Topbar
