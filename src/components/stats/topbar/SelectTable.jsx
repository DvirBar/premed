import React from 'react';
import { useSelector } from 'react-redux';
import { 
    Link, 
    matchPath, 
    useLocation,  
    useRouteMatch } from 'react-router-dom';
import { getAllTables } from '../../../redux/selectors/datatables';

function SelectTable({ tableId, pathId}) {
    let { path } = useRouteMatch();

    const tables = useSelector(getAllTables)

    const linksList = tables.map(table => ({
        name: table.name,
        url: `${path}/${pathId}/${table._id}/table`,
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
