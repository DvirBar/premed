import React from 'react'
import PathsChoose from './PathsChoose'
import SelectTable from './SelectTable'
import TypeChoose from './TypeChoose'

function Topbar({ tableId }) {
    return (
        <div className="top-content-nav">
            <PathsChoose tableId={tableId} />
            <SelectTable />
            <TypeChoose />
        </div>
    )
}

export default Topbar
