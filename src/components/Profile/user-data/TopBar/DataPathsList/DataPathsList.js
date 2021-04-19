import React, { Fragment, useState } from 'react'
import EditDataPaths from '../../EditDataPaths'

function DataPathsList({ paths, tableId }) {
    const [displayEdit, setDisplayEdit] = useState(false)
    
    const toggleEdit = open => {
        setDisplayEdit(open)
    }

    return (
        <div className="data-paths">
            <p className="data-paths__info">
                <span className="data-paths__info__title">
                    המסלולים שלי:
                </span>&nbsp;
                <span 
                className="data-paths__info__edit"
                onClick={() => toggleEdit(true)}>עריכה</span>
            </p>
            <p className="data-paths__paths-list">
                {paths.map(path => 
                    <span className="data-paths__paths-list__item">
                        {path.name}
                    </span>
                )}
            </p>
            

            <EditDataPaths
            userPaths={paths}
            display={displayEdit}
            toggleModal={toggleEdit}
            tableId={tableId}
            title='עריכת מסלולים' />
        </div>
    )
}

export default DataPathsList
