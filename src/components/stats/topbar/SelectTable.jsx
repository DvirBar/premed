import React from 'react';
import { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { TABLE } from '../../../redux/actions/types';
import { isLoading } from '../../../redux/loader/selectors';
import { getAllTables } from '../../../redux/selectors/datatables';
import Loadbar from '../../layout/Loadbar';

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
            {loading 
            ?   <div className="loading-wrapper">
                    <Loadbar />
                </div>
            :   <Fragment>
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
                </Fragment>
            }
        </div>
    )
}

export default SelectTable
