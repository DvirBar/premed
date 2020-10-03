import React from 'react'
import EditTable from './EditTable'
import ToggleEnabled from './ToggleEnabled'

function EditSection({ table }) {
    return (
        <div className="edit-section">
            <EditTable table={table} />
            {!table.url &&
                <ToggleEnabled table={table} />
            }
        </div>
    )
}

export default EditSection
