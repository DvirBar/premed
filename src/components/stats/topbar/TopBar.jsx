import React from 'react'
import { 
    matchPath, 
    useLocation, 
    useRouteMatch } from 'react-router-dom'
import PathsChoose from './PathsChoose'
import SelectTable from './SelectTable'
import TypeChoose from './TypeChoose'

function Topbar({ tableId }) {
    let { path } = useRouteMatch();
    const location = useLocation();
    
    const match = matchPath(location.pathname, {
        path: `${path}/:pathId/:tableId/:type`,
        exact: true,
        strict: false
      });
    let selPath, selTable

    if(match && match.params) {
        selPath = match.params.pathId
        selTable = match.params.tableId 
    }


    return (
        <div className="top-content-nav">
            <PathsChoose tableId={tableId} />
            <SelectTable
            pathId={selPath}
            tableId={selTable} />
            <TypeChoose 
            pathId={selPath}
            tableId={selTable} />
        </div>
    )
}

export default Topbar
