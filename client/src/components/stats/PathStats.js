import React, { Fragment, useEffect } from 'react';
import DataTable from './DataTable';
import { useDispatch, useSelector } from 'react-redux';
import { getUsersDataByPathTable } from '../../redux/actions/userdata';
import { getTableById } from '../../redux/selectors/datatables';
import { Link } from 'react-router-dom';

function PathStats({ pathId, tableId }) {
    const table = useSelector(getTableById(tableId))

    const dispatch = useDispatch()

    useEffect(() => {
        if(tableId) {
            dispatch(getUsersDataByPathTable(tableId, pathId))
        }
    }, [pathId, tableId])


    const urlTableTitle = 'הצגת טבלת הנתונים ' + table?.name
    
    return (
        <div>
            {table?.url
            ?   <p className="external-link-container">
                    <a 
                    href={table.url}
                    target="_blank"
                    className="external-table-link"
                    rel="noopener noreferrer">{urlTableTitle}</a>
                </p>
            :   <div>
                    <div className="data-table-info">
                        <p>
                        טבלת המועמדים היא המקום בו תוכלו להשוות את הנתונים שלכם עם נתוני המועמדים האחרים.
                        </p>
                        <p>
                            רוצים להזין גם את הנתונים שלכם? ניתן לעשות זאת ב
                            <Link to="/profile/userdata">
                               איזור האישי 
                            </Link>.
                        </p>
                    </div>
                    <DataTable 
                    pathId={pathId} />
                </div>
            
            }
        </div>
    )
}

export default PathStats
