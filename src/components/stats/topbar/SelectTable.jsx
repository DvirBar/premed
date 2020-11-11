import React from 'react';
import { useSelector } from 'react-redux';
import { 
    Link, 
    matchPath, 
    useLocation,  
    useRouteMatch } from 'react-router-dom';
import { getAllTables } from '../../../redux/selectors/datatables';

function SelectTable() {
    let { path } = useRouteMatch();
    const location = useLocation()

    const match = matchPath(location.pathname, {
        path: `${path}/:pathId/:tableId`,
        exact: true,
        strict: false
      });
    let pathId, tableId

    if(match && match.params) {
        pathId = match.params.pathId
        tableId = match.params.tableId 
    }

    const tables = useSelector(getAllTables)

    const linksList = tables.map(table => ({
        name: table.name,
        url: `${path}/${pathId}/${table._id}`,
        id: table._id
    }))

    return (
        <div className="tables-choose-list">
            <p className="tables-choose-title">
                שנת לימודים
            </p>
            <div className="tables-options">
                {linksList.map(link => 
                    <Link
                    className={link.id === tableId
                    ?   "table-option-item selected"
                    :   "table-option-item"}
                    to={link.url}>
                        {link.name}
                    </Link>)}
            </div>
           
        </div>
    )
}

export default SelectTable
