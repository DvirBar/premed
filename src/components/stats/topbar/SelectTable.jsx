import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { TABLE } from '../../../redux/actions/types';
import { isLoading } from '../../../redux/loader/selectors';
import { getAllTables } from '../../../redux/selectors/datatables';

function SelectTable({ tableId, pathId, type, newPath }) {
    const tables = useSelector(getAllTables)
    const loading = useSelector(isLoading(TABLE))

    const linksList = tables.map(table => ({
        name: table.name,
        url: newPath(pathId, table._id, type),
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
                    key={link.id}
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
