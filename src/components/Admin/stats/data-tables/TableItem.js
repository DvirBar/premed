import React, { Fragment, useState } from 'react';
import TableDetails from './TableDetails';


function TableItem({ table }) {
    const [display, setDisplay] = useState(false)

    const toggleModal = open => {
        setDisplay(open)
    }

    return (
        <Fragment>
             <div 
            className="table-list-item"
            onClick={() => toggleModal(true)}>
                <span className="table-name">
                    {table.name}
                </span>
                {table.url 
                ?   <a 
                    href={table.url} 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ext-table">טבלה חיצונית</a>

                :   <span className="enabled-status">
                        {table.enabled
                        ?   <span className="enabled">טבלה פעילה</span>
                
                        :   <span className="disabled">טבלה סגורה</span>}
                    </span>
                }
            </div>

            <TableDetails
            table={table}
            display={display}
            toggleModal={toggleModal} />
        </Fragment>
    )
}

export default TableItem
