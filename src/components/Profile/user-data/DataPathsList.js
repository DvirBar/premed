import React, { Fragment, useState } from 'react'
import EditDataPaths from './EditDataPaths'

function DataPathsList({ paths }) {
    const [displayEdit, setDisplayEdit] = useState(false)
    
    const toggleEdit = open => {
        setDisplayEdit(open)
    }

    return (
        <div className="data-paths">
            <p>
                <span className="data-paths-title">המסלולים שלי:</span>
                <span 
                className="edit-paths-link"
                onClick={() => toggleEdit(true)}>עריכה</span>
            </p>
            {paths.map((path, index) => 
                <span>
                    {path.name}
                    {index !== paths.length-1 && <Fragment>, </Fragment>}
                </span>
            )}

            <EditDataPaths
            userPaths={paths}
            display={displayEdit}
            toggleModal={toggleEdit}
            title='עריכת מסלולים' />
        </div>
    )
}

export default DataPathsList
