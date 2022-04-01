import React, { Fragment, useState } from 'react'
import { useSelector } from 'react-redux';
import { getTableById } from '../../../../../redux/selectors/datatables';
import { selTableSelector } from '../../../../../redux/selectors/userdata';
import AddNewEmptyTable from './AddNewEmptyTable';
import CopyTableData from './CopyTableData';

function NewTable() {
    const selTableId = useSelector(selTableSelector);
    const table = useSelector(getTableById(selTableId));
    const [displayAddNewTable, setDisplayAddNewTable] = useState(false);
    
    return (
        <div>
            <h1>נתונים לשנת {table?.name}</h1>
            {displayAddNewTable && table
            ?   <AddNewEmptyTable tableId={table?._id} />
            :    <Fragment>
                    <div className="description">
                        <p>זו טבלה חדשה ועדיין לא הזנתם נתונים עבורה.</p>
                        <p>האם תרצו שנעתיק עבורכם את הנתונים מהטבלה הקודמת?</p>
                    </div>
                    <CopyTableData setDisplayAddNewTable={setDisplayAddNewTable} />
                </Fragment>
            }
        </div>
    
    )
}

export default NewTable;
