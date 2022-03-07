import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { getTableById } from '../../../../../redux/selectors/datatables'
import { selTableSelector } from '../../../../../redux/selectors/userdata'
import EditPaths from './EditPaths/EditPaths'

function DataPathsList({ paths, tableId }) {
    const [displayEdit, setDisplayEdit] = useState(false)
    
    const toggleEdit = open => {
        setDisplayEdit(open)
    }
    const selTableId = useSelector(selTableSelector);
    const table = useSelector(getTableById(selTableId));

    return (
        <div className="data-paths">
            <p className="data-paths__info">
                <span className="data-paths__info__title">
                    המסלולים שלי:
                </span>&nbsp;
                {/* {table?.enabled && */}
                   <span 
                   className="data-paths__info__edit"
                   onClick={() => toggleEdit(true)}>עריכה</span>
                {/* } */}
             
            </p>
            <p className="data-paths__paths-list">
                {paths.map(path => 
                    <span className="data-paths__paths-list__item">
                        {path.name}
                    </span>
                )}
            </p>
            

            <EditPaths
            userPaths={paths}
            display={displayEdit}
            toggleModal={toggleEdit}
            tableId={tableId}
            title='עריכת מסלולים' />
        </div>
    )
}

export default DataPathsList
